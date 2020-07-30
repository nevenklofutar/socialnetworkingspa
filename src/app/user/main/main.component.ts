import { Component, OnInit } from '@angular/core';
import { User, Post } from 'src/backend/interfaces';
import { PostService } from 'src/backend/endpoints/post.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
    currentUser: User;
    posts: Post[];
    public newPostForm: FormGroup;
    showPostButtons: boolean = false;
    processingForm = false;

    constructor(
        public postService: PostService,
        public authService: AuthService,
        private formBuilder: FormBuilder,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.buildForm();
        this.getPosts();
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

        let postToCreate: Post = {
            id: 0,
            title: 'title',
            body: postBody,
            createdById: this.currentUser.id,
        };

        this.postService
            .createPost(postToCreate)
            .subscribe(
                (result) => {
                    this.getPosts();
                    this.showPostButtons = false;
                    this.newPostForm.get('newpost').patchValue('');
                },
                (error) => {
                    this.alertifyService.error('error creating post');
                    console.log(error);
                }
            )
            .add(() => {
                this.processingForm = false;
            });
    }

    getPosts() {
        this.postService.getPosts().subscribe(
            (result) => {
                this.posts = result;
            },
            (error) => {
                this.alertifyService.error('error getting posts');
                console.log(error);
            }
        );
    }
}
