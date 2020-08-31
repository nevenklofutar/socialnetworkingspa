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
    // https://medium.com/@mariemchabeni/angular-7-drag-and-drop-simple-file-uploadin-in-less-than-5-minutes-d57eb010c0dc
    constructor() {}

    ngOnInit() {}

    @Output() onFileDropped = new EventEmitter<any>();

    @HostBinding('style.background-color') private background = '#f5fcff';
    @HostBinding('style.opacity') private opacity = '1';

    //Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(evt) {
        console.log('Dragover listener');

        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = '0.8';
    }

    //Dragleave listener
    @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
        console.log('Dragleave listener');

        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
    }

    //Drop listener
    @HostListener('drop', ['$event']) public ondrop(evt) {
        console.log('Drop listener');

        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#f5fcff';
        this.opacity = '1';
        // let files = evt.dataTransfer.files;
        this.files = evt.dataTransfer.files;
        // if (files.length > 0) {
        if (this.files.length > 0) {
            // this.onFileDropped.emit(files);
            this.onFileDropped.emit(this.files);
        }
    }

    files: any = [];

    uploadFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }
    deleteAttachment(index) {
        this.files.splice(index, 1);
    }
}
