import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Post } from 'src/backend/interfaces';
import { LikeService } from 'src/backend/endpoints/like.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    likesCount: number = 0;

    constructor(
        private likeService: LikeService,
        private alertifyService: AlertifyService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.refreshLikesCount();
    }

    refreshLikesCount() {
        this.getLikesCountForPost(this.post.id);
    }

    toggleLike(postId: number) {
        this.likeService.likePost(postId).subscribe(
            () => {
                this.refreshLikesCount();
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }

    getLikesCountForPost(postId: number) {
        this.likeService.getLikesCountForPost(postId).subscribe(
            (response) => {
                this.likesCount = response;
                this.ref.detectChanges();
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }
}
