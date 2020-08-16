import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { Post, CommentToAdd, PostForUpdate } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { PostEventsService } from '../../_events/post-events.service';
import { CommentEventsService } from '../../_events/comment-events.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { YesNoDialogComponent } from '../../dialogs/yes-no-dialog/yes-no-dialog.component';
import { EditDialogComponent } from '../../dialogs/edit-dialog/edit-dialog.component';

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
        public deletePostDialog: MatDialog,
        public editPostDialog: MatDialog
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
        const deleteDialogRef = this.deletePostDialog.open(
            YesNoDialogComponent,
            {
                data: {
                    postId: postId,
                    content: 'Are you sure you want to delete this post ?',
                },
            }
        );
        deleteDialogRef.afterClosed().subscribe((result) => {
            if (result !== false) this.deletePost(result);
        });
    }

    openDialogEdit(post: Post) {
        const editDialogRef = this.editPostDialog.open(EditDialogComponent, {
            maxWidth: '75vw',
            width: '75vw',

            data: {
                id: post.id,
                value: post.body,
                title: 'Post',
            },
        });
        editDialogRef.afterClosed().subscribe((result) => {
            let postForUpdate: PostForUpdate = {
                id: result.id,
                title: '',
                body: result.value,
            };

            if (result !== null) this.updatePost(postForUpdate);
        });
    }
}
