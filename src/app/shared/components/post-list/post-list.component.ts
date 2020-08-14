import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    ViewChild,
    ViewChildren,
    QueryList,
} from '@angular/core';
import { Post } from 'src/backend/interfaces';
import { Subscription } from 'rxjs';
import { PostEventsService } from '../../_events/post-events.service';
import { AlertifyService } from '../../_services/alertify.service';
import { PostService } from 'src/backend/endpoints/post.service';
import { LikeService } from 'src/backend/endpoints/like.service';
import { PostComponent } from '../post/post.component';
import { elementAt } from 'rxjs/operators';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
    @ViewChildren(PostComponent) viewChildren!: QueryList<PostComponent>;
    @Input()
    currentUserId: string;
    posts: Post[];

    updatingPosts = new Map<number, boolean>();
    updatingLikes = new Map<number, boolean>();

    private deleteSubscription: Subscription;
    private likeToggleSubscription: Subscription;

    constructor(
        private postEventsService: PostEventsService,
        private alertifyService: AlertifyService,
        public postService: PostService,
        public likeService: LikeService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.deleteSubscription = this.postEventsService.onPostDelete$.subscribe(
            (id) => this.deletePost(id)
        );
        this.likeToggleSubscription = this.postEventsService.onPostLikeToggle$.subscribe(
            (id) => this.toggleLike(id)
        );
        this.getPosts();
    }

    ngOnDestroy() {
        this.deleteSubscription.unsubscribe();
        this.likeToggleSubscription.unsubscribe();
    }

    trackByPost(index, item: Post) {
        return item.id;
    }

    getPosts() {
        this.postService.getPostsForUser(this.currentUserId).subscribe(
            (response) => {
                this.posts = response;
                this.ref.detectChanges();
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }

    getLikesForPost(postId: number) {
        this.updatingLikes.set(postId, true);

        this.likeService.getLikesForPost(postId).subscribe(
            (response) => {
                var post = this.posts.find((p) => p.id == postId);
                post.likes = response;

                this.viewChildren.forEach((element) => {
                    if (element.getPost().id === post.id)
                        element.setLikeButton();
                });
            },
            (error) => {
                console.log(error.error);
            }
        );
    }

    async deletePost(postId: number) {
        this.updatingPosts.set(postId, true);

        try {
            const response = await this.postService
                .deletePost(postId)
                .toPromise();

            this.alertifyService.success('Post deleted.');
            this.posts = this.posts.filter((item) => item.id !== postId);
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            this.updatingPosts.delete(postId);
            this.ref.detectChanges();
        }
    }

    async toggleLike(postId: number) {
        this.updatingPosts.set(postId, true);

        try {
            const response = await this.likeService
                .likePost(postId)
                .toPromise();

            this.getLikesForPost(postId);
            this.ref.detectChanges();
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            this.updatingPosts.delete(postId);
            this.ref.detectChanges();
        }
    }
}
