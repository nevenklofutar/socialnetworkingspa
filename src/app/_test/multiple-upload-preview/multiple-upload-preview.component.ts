import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-multiple-upload-preview',
    templateUrl: './multiple-upload-preview.component.html',
    styleUrls: ['./multiple-upload-preview.component.css'],
})
export class MultipleUploadPreviewComponent implements OnInit {
    // https://bezkoder.com/angular-10-multiple-files-upload/
    selectedFiles: FileList;
    progressInfos = [];
    message = '';

    fileInfos: Observable<any>;

    constructor() {}

    ngOnInit(): void {
        //this.fileInfos = this.uploadService.getFiles();
    }

    selectFiles(event): void {
        this.progressInfos = [];
        this.selectedFiles = event.target.files;

        console.log(this.selectedFiles);
    }

    uploadFiles(): void {
        this.message = '';

        for (let i = 0; i < this.selectedFiles.length; i++) {
            this.upload(i, this.selectedFiles[i]);
        }
    }

    upload(idx, file): void {
        this.progressInfos[idx] = { value: 0, fileName: file.name };

        // this.uploadService.upload(file).subscribe(
        //     (event) => {
        //         if (event.type === HttpEventType.UploadProgress) {
        //             this.progressInfos[idx].value = Math.round(
        //                 (100 * event.loaded) / event.total
        //             );
        //         } else if (event instanceof HttpResponse) {
        //             this.fileInfos = this.uploadService.getFiles();
        //         }
        //     },
        //     (err) => {
        //         this.progressInfos[idx].value = 0;
        //         this.message = 'Could not upload the file:' + file.name;
        //     }
        // );
    }
}
