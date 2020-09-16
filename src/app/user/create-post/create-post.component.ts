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
import { HttpClient } from '@angular/common/http';

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
    files = [];

    constructor(
        private formBuilder: FormBuilder,
        private alertifyService: AlertifyService,
        private postService: PostService,
        private photoService: PhotoService,
        private ref: ChangeDetectorRef,
        private http: HttpClient
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.newPostForm = this.formBuilder.group({
            newpost: [''],
            files: [''],
        });
    }

    cancelPost() {
        this.showPostButtons = false;
        this.newPostForm.get('newpost').patchValue('');
        this.photosForUpload = <PhotosForUpload>{ photos: [] };
        this.files = [];
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

                    this.cancelPost();
                },
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            )
            .add(() => {
                this.processingForm = false;
            });
    }

    // postPhotosTest() {
    //     // MULTI UPLOAD IMAGES
    //     // this works when you want to send mutiple files at once to the backend
    //     // on the .net core backend, you need to receive it like this:
    //     // public IActionResult AddPhotosForUserTest([FromForm] IFormFileCollection files) {
    //     // files = Request.Form.Files;

    //     const formData = new FormData();
    //     for (var i = 0; i < this.files.length; i++) {
    //         formData.append('files[]', this.files[i], this.files[i].name);
    //     }

    //     console.log('this.files');
    //     console.log(this.files);
    //     console.log('formData.get("file[]")');
    //     console.log(formData.getAll('files[]'));

    //     this.http
    //         .post('https://localhost:5001/api/photos/filecollection', formData)
    //         .subscribe(
    //             (result) => {},
    //             (error) => {
    //                 console.log(error);
    //             }
    //         );
    // }

    postPhotos(postId: number) {
        this.photosForUpload.photos.forEach((element) => {
            element.postId = postId;
        });

        if (
            this.photosForUpload &&
            this.photosForUpload.photos &&
            this.photosForUpload.photos.length > 0
        ) {
            this.photoService
                .uploadPhotos(this.photosForUpload)
                .subscribe(
                    () => {
                        this.postListComponent.getPosts();
                    },
                    (error) => {
                        this.alertifyService.error(error.error.title);
                    }
                )
                .add(() => {
                    this.showPostButtons = false;
                    this.processingForm = false;
                });
        }
    }

    // drag and drop
    onFileChange(event) {
        if (event && event[0]) {
            var filesAmount = event.length;

            // max 5 files to uplad
            if (filesAmount + this.files.length > 5) {
                this.alertifyService.error('Max 5 files allowed');
                return;
            }

            for (let i = 0; i < filesAmount; i++) {
                this.files.push(event[i]);
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
