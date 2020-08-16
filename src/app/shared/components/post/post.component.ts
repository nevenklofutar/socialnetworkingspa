import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Post, CommentToAdd } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { PostEventsService } from '../../_events/post-events.service';
import { CommentEventsService } from '../../_events/comment-events.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { YesNoComponent } from '../../../shared/dialogs/yes-no/yes-no.component';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
    @Input() post: Post;
    @Input() disabled: boolean = false;

    newCommentForm: FormGroup;

    processingLike = false;
    likeButtonName = 'Like';
    likeButtonColor = 'accent';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private postEventsService: PostEventsService,
        private commentEventsService: CommentEventsService,
        private ref: ChangeDetectorRef,
        public deletePostDialog: MatDialog
    ) {}

    ngOnInit() {
        this.buildForm();
        this.setLikeButton();
    }

    buildForm() {
        this.newCommentForm = this.formBuilder.group({
            newComment: [''],
        });
    }

    showDeleteButton() {
        return this.post.createdById === this.authService.getCurrentUser().id;
    }

    toggleLike = (postId: number) => this.postEventsService.toggleLike(postId);
    deletePost = (postId: number) => this.postEventsService.deletePost(postId);
    addComment = (comment: CommentToAdd) =>
        this.commentEventsService.addComment(comment);

    editPost(postId: number) {
        alert('under contruction ' + this.post.id);
    }

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

    createComment(event) {
        if (event.keyCode === 13) {
            let commentToAdd = this.getCommentToAdd();

            this.addComment(commentToAdd);
        }
    }

    getCommentToAdd() {
        let commentToAdd: CommentToAdd = {
            postId: this.post.id,
            CommentedById: this.authService.getCurrentUser().id,
            content: this.newCommentForm.get('newComment').value,
        };
        return commentToAdd;
    }

    openDialogDelete(postId: number) {
        const deleteDialogRef = this.deletePostDialog.open(YesNoComponent, {
            data: {
                postId: postId,
                content: 'Are you sure you want to delete this post ?',
            },
        });
        deleteDialogRef.afterClosed().subscribe((result) => {
            if (result !== false) this.deletePost(result);
        });
    }
}
