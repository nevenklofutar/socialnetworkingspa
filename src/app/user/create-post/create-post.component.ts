import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { PostService } from 'src/backend/endpoints/post.service';
import { Likes, Post, User } from 'src/backend/interfaces';
import { PostListComponent } from 'src/app/shared/components/post-list/post-list.component';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
    @Input() postListComponent: PostListComponent;
    @Input() currentUser: User;

    newPostForm: FormGroup;
    showPostButtons: boolean = false;
    processingForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private alertifyService: AlertifyService,
        private postService: PostService
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.newPostForm = this.formBuilder.group({
            newpost: [''],
        });
    }

    cancelPost() {
        this.showPostButtons = false;
        this.newPostForm.get('newpost').patchValue('');
    }

    showPostButton() {
        return this.newPostForm.get('newpost').value.length === 0;
    }

    onSubmit() {
        this.processingForm = true;
        let postBody = this.newPostForm.get('newpost').value;
        if (!postBody || postBody.length == 0) return;

        let likes: Likes = {
            currentUserLiked: false,
            likesCount: 0,
        };
        let postToCreate: Partial<Post> = {
            id: 0,
            title: 'title',
            body: postBody,
            createdById: this.currentUser.id,
            likes: likes,
        };

        this.postService
            .createPost(postToCreate)
            .subscribe(
                (result) => {
                    this.showPostButtons = false;
                    this.newPostForm.get('newpost').patchValue('');
                    this.postListComponent.getPosts();
                },
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            )
            .add(() => {
                this.processingForm = false;
            });
    }
}
