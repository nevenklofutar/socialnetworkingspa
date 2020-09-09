import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import {
    Post,
    Comment,
    CommentToAdd,
    PostForUpdate,
    CommentForUpdate,
    CommentForDelete,
    Photo,
} from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { PostEventsService } from '../../_events/post-events.service';
import { CommentEventsService } from '../../_events/comment-events.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../dialogs/yes-no-dialog/yes-no-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';
import { ImageGalleryComponent } from '../image-gallery/image-gallery.component';

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
        public deleteDialog: MatDialog,
        public editDialog: MatDialog
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
    updatePost = (post: PostForUpdate) =>
        this.postEventsService.updatePost(post);
    deleteComment = (comment: CommentForDelete) =>
        this.commentEventsService.deleteComment(comment);
    updateComment = (comment: CommentForUpdate) =>
        this.commentEventsService.updateComment(comment);

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

    openPostDialogDelete(postId: number) {
        const deleteDialogRef = this.deleteDialog.open(YesNoDialogComponent, {
            data: {
                id: postId,
                content: 'Are you sure you want to delete this post ?',
            },
        });
        deleteDialogRef.afterClosed().subscribe((result) => {
            if (result !== null && result !== undefined && result !== false)
                this.deletePost(result);
        });
    }

    openPostDialogEdit(post: Post) {
        const editDialogRef = this.editDialog.open(EditDialogComponent, {
            maxWidth: '75vw',
            width: '75vw',

            data: {
                id: post.id,
                value: post.body,
                title: 'Post',
            },
        });
        editDialogRef.afterClosed().subscribe((result) => {
            if (result !== null && result !== undefined) {
                let postForUpdate: PostForUpdate = {
                    id: result.id,
                    title: '',
                    body: result.value,
                };
                this.updatePost(postForUpdate);
            }
        });
    }

    commentMenu() {
        console.log('commentMenu');
    }

    showCommentMenuButton(comment: Comment) {
        return this.authService.getCurrentUser().id === comment.commentedById;
    }

    openCommentDialogEdit(comment: Comment) {
        const editDialogRef = this.editDialog.open(EditDialogComponent, {
            maxWidth: '75vw',
            width: '75vw',

            data: {
                id: comment.id,
                value: comment.content,
                title: 'Comment',
            },
        });
        editDialogRef.afterClosed().subscribe((result) => {
            if (result !== null && result !== undefined) {
                let commentForUpdate: CommentForUpdate = {
                    postId: this.post.id,
                    content: result.value,
                    id: comment.id,
                };
                this.updateComment(commentForUpdate);
            }
        });
    }

    openCommentDialogDelete(commentToDelete: CommentForDelete) {
        const deleteDialogRef = this.deleteDialog.open(YesNoDialogComponent, {
            data: {
                id: commentToDelete,
                content: 'Are you sure you want to delete this comment ?',
            },
        });

        deleteDialogRef.afterClosed().subscribe((result) => {
            if (result !== null && result !== undefined && result !== false)
                this.deleteComment(result);
        });
    }
}
