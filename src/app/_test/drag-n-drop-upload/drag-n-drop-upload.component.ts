import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    HostBinding,
    HostListener,
} from '@angular/core';

@Component({
    selector: 'app-drag-n-drop-upload',
    templateUrl: './drag-n-drop-upload.component.html',
    styleUrls: ['./drag-n-drop-upload.component.css'],
})
export class DragNDropUploadComponent implements OnInit {
    files: any = [];

    // https://medium.com/@mariemchabeni/angular-7-drag-and-drop-simple-file-uploadin-in-less-than-5-minutes-d57eb010c0dc
    constructor() {}

    ngOnInit(): void {}

    uploadFile(files): void {
        for (const file of files) {
            this.files.push(file.name);
        }
    }
    deleteAttachment(index): void {
        this.files.splice(index, 1);
    }
}
