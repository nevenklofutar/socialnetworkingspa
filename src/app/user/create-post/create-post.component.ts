import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { PostService } from 'src/backend/endpoints/post.service';
import { PhotoService } from 'src/backend/endpoints/photo.service';
import { Likes, Post, User, PhotosForUpload } from 'src/backend/interfaces';
import { PostListComponent } from 'src/app/shared/components/post-list/post-list.component';

@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostComponent implements OnInit {
    @Input() postListComponent: PostListComponent;
    @Input() currentUser: User;

    newPostForm: FormGroup;
    showPostButtons: boolean = false;
    processingForm = false;

    // drag and drop
    photosForUpload: PhotosForUpload = { photos: [] };

    constructor(
        private formBuilder: FormBuilder,
        private alertifyService: AlertifyService,
        private postService: PostService,
        private photoService: PhotoService,
        private ref: ChangeDetectorRef
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
        this.photosForUpload = <PhotosForUpload>{ photos: [] };
    }

    showPostButton() {
        return this.newPostForm.get('newpost').value.length === 0;
    }

    onSubmit() {
        this.processingForm = true;
        let postBody = this.newPostForm.get('newpost').value;

        if (!postBody || postBody.length == 0) return;

        let postToCreate: Partial<Post> = {
            id: 0,
            title: 'title',
            body: postBody,
            createdById: this.currentUser.id,
            likes: {
                currentUserLiked: false,
                likesCount: 0,
            },
        };

        this.postService
            .createPost(postToCreate)
            .subscribe(
                (response: any) => {
                    this.postPhotos(response.id);

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

    postPhotos(postId: number) {
        this.photosForUpload.photos.forEach((element) => {
            element.postId = postId;
        });

        this.photoService
            .uploadPhotos(this.photosForUpload)
            .subscribe(
                () => {},
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            )
            .add(() => {
                this.showPostButtons = false;
                this.processingForm = false;
            });
    }

    // drag and drop
    onFileChange(event) {
        if (event && event[0]) {
            var filesAmount = event.length;
            for (let i = 0; i < filesAmount; i++) {
                const fileName = event[i].name;
                if (this.validateFile(fileName)) {
                    var reader = new FileReader();
                    reader.onload = (event: any) => {
                        this.photosForUpload.photos.push({
                            photoName: fileName,
                            photoBase64String: event.target.result,
                            postId: 0,
                        });
                        this.ref.detectChanges();
                    };
                    reader.readAsDataURL(event[i]);
                } else {
                    this.alertifyService.error('Only images allowed');
                }
            }
        }
    }

    removeImage(index: number) {
        let indexToRemove = confirm('remove image? ' + index);
    }

    validateFile(name: String) {
        var ext = name.substring(name.lastIndexOf('.') + 1);

        switch (ext.toLowerCase()) {
            case 'png':
            case 'jpg':
            case 'gif':
                return true;
            default:
                return false;
        }
    }
}
