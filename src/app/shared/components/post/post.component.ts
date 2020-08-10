import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Post, Like, User } from 'src/backend/interfaces';
import { LikeService } from 'src/backend/endpoints/like.service';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from 'src/backend/endpoints/auth.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    likes: Like[];
    processingLike = false;
    likeButtonName = 'Like';
    likeButtonColor = 'accent';

    constructor(
        private likeService: LikeService,
        private alertifyService: AlertifyService,
        private authService: AuthService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.refreshLikesCount();
    }

    refreshLikesCount() {
        this.getLikesForPost(this.post.id);
    }

    toggleLike(postId: number) {
        this.processingLike = true;

        this.likeService
            .likePost(postId)
            .subscribe(
                () => {
                    this.refreshLikesCount();
                },
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            )
            .add(() => {
                this.processingLike = false;
            });
    }

    getLikesForPost(postId: number) {
        this.likeService
            .getLikesForPost(postId)
            .subscribe(
                (response) => {
                    this.likes = response;
                    this.ref.detectChanges();
                },
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            )
            .add(() => {
                this.setLikeButton();
            });
    }

    setLikeButton() {
        let currentUser = this.authService.getCurrentUser();
        let like = this.likes.find((l) => l.likerId === currentUser.id);

        if (currentUser?.id === like?.likerId) {
            this.likeButtonName = 'Unlike';
            this.likeButtonColor = 'warn';
        } else {
            this.likeButtonName = 'Like';
            this.likeButtonColor = 'accent';
        }

        this.ref.detectChanges();
    }
}
