import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Post } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { PostEventsService } from '../../_events/post-events.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    @Input() disabled: boolean = false;

    processingLike = false;
    likeButtonName = 'Like';
    likeButtonColor = 'accent';

    constructor(
        private authService: AuthService,
        private postEventsService: PostEventsService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.setLikeButton();
    }

    showDeleteButton() {
        return this.post.createdById === this.authService.getCurrentUser().id;
    }

    toggleLike = (postId: number) => this.postEventsService.toggleLike(postId);
    deletePost = (postId: number) => this.postEventsService.deletePost(postId);

    public setLikeButton() {
        if (this.post.likes.currentUserLiked === true) {
            this.likeButtonName = 'Unlike';
            this.likeButtonColor = 'warn';
        } else {
            this.likeButtonName = 'Like';
            this.likeButtonColor = 'accent';
        }
        this.ref.detectChanges();
    }

    public getPost() {
        return this.post;
    }
}
