import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-create-post-upload-images',
    templateUrl: './create-post-upload-images.component.html',
    styleUrls: ['./create-post-upload-images.component.css'],
})
export class CreatePostUploadImagesComponent implements OnInit {
    files: any = [];

    onFileChange(event) {
        console.log(event);

        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }

    deleteAttachment(index) {
        this.files.splice(index, 1);
    }

    ngOnInit() {}
}
