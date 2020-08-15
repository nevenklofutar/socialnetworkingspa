import { Component, OnInit, ViewChild } from '@angular/core';
import { User, Post, Likes } from 'src/backend/interfaces';
import { PostService } from 'src/backend/endpoints/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { PostListComponent } from 'src/app/shared/components/post-list/post-list.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    @ViewChild(PostListComponent)
    private postListComponent: PostListComponent;
    currentUser: User;
    newPostForm: FormGroup;
    showPostButtons: boolean = false;
    processingForm = false;

    constructor(
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private alertifyService: AlertifyService,
        private postService: PostService
    ) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
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
