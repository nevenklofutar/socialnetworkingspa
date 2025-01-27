import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    Input,
    ChangeDetectorRef,
    ViewChildren,
    QueryList,
} from '@angular/core';
import {
    Post,
    CommentToAdd,
    Comment,
    PostForUpdate,
    CommentForUpdate,
    CommentForDelete,
} from 'src/backend/interfaces';
import { Subscription } from 'rxjs';
import { PostEventsService } from '../../_events/post-events.service';
import { CommentEventsService } from '../../_events/comment-events.service';
import { AlertifyService } from '../../_services/alertify.service';
import { PostService } from 'src/backend/endpoints/post.service';
import { CommentService } from 'src/backend/endpoints/comment.service';
import { LikeService } from 'src/backend/endpoints/like.service';
import { PostComponent } from '../post/post.component';

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
    posts: Post[] = [];

    updatingPosts = new Map<number, boolean>();
    updatingLikes = new Map<number, boolean>();

    private deleteSubscription: Subscription;
    private updateSubscription: Subscription;
    private likeToggleSubscription: Subscription;
    private addCommentSubscription: Subscription;
    private updateCommentSubscription: Subscription;
    private deleteCommentSubscription: Subscription;

    constructor(
        private postEventsService: PostEventsService,
        private commentEventsService: CommentEventsService,
        private alertifyService: AlertifyService,
        public postService: PostService,
        public likeService: LikeService,
        public commentService: CommentService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.deleteSubscription = this.postEventsService.onPostDelete$.subscribe(
            (id) => this.deletePost(id)
        );
        this.updateSubscription = this.postEventsService.onPostUpdate$.subscribe(
            (postForUpdate) => this.updatePost(postForUpdate)
        );
        this.likeToggleSubscription = this.postEventsService.onPostLikeToggle$.subscribe(
            (id) => this.toggleLike(id)
        );
        this.addCommentSubscription = this.commentEventsService.onCommentAdd$.subscribe(
            (commentToAdd) => this.addComment(commentToAdd)
        );
        this.updateCommentSubscription = this.commentEventsService.onCommentUpdate$.subscribe(
            (commentForUpdate) => this.updateComment(commentForUpdate)
        );
        this.deleteCommentSubscription = this.commentEventsService.onCommentDelete$.subscribe(
            (commentForDelete) => this.deleteComment(commentForDelete)
        );
        this.getPosts();
    }

    ngOnDestroy() {
        this.deleteSubscription.unsubscribe();
        this.likeToggleSubscription.unsubscribe();
        this.addCommentSubscription.unsubscribe();
        this.updateSubscription.unsubscribe();
        this.updateCommentSubscription.unsubscribe;
        this.deleteCommentSubscription.unsubscribe;
    }

    trackByPost(index, item: Post) {
        return item.id;
    }

    getPosts() {
        this.postService.getPostsForUser(this.currentUserId).subscribe(
            (posts) => {
                this.posts = posts;
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

    async updatePost(post: PostForUpdate) {
        this.updatingPosts.set(post.id, true);

        try {
            const response = await this.postService
                .updatePost(post)
                .toPromise();

            this.getPosts();
            this.ref.detectChanges();
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            this.updatingPosts.delete(post.id);
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

    async addComment(comment: CommentToAdd) {
        this.updatingPosts.set(comment.postId, true);

        try {
            const response = await this.commentService
                .createComment(comment)
                .toPromise();

            // TODO: change this to update only post that got comment added to, not all of them
            this.getPosts();
            this.ref.detectChanges();
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            this.updatingPosts.delete(comment.postId);
            this.ref.detectChanges();
        }
    }

    async updateComment(comment: CommentForUpdate) {
        // this.updatingPosts.set(comment.postId, true);

        try {
            const response = await this.commentService
                .updateComment(comment)
                .toPromise();

            // TODO: change this to update only post that got comment added to, not all of them
            this.getPosts();
            this.ref.detectChanges();
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            // this.updatingPosts.delete(comment.postId);
            this.ref.detectChanges();
        }
    }

    async deleteComment(comment: CommentForDelete) {
        // this.updatingPosts.set(comment.postId, true);

        try {
            const response = await this.commentService
                .deleteComment(comment.postId, comment.commentId)
                .toPromise();

            // TODO: change this to update only post that got comment added to, not all of them
            this.getPosts();
            this.ref.detectChanges();
        } catch (e) {
            this.alertifyService.error(e.error.title);
        } finally {
            // this.updatingPosts.delete(comment.postId);
            this.ref.detectChanges();
        }
    }
}
