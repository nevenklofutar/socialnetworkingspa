import { Component, OnInit, Input } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { __importDefault } from 'tslib';
import { Photo } from 'src/backend/interfaces';

@Component({
    selector: 'app-image-gallery',
    templateUrl: './image-gallery.component.html',
    styleUrls: ['./image-gallery.component.css'],
})
export class ImageGalleryComponent implements OnInit {
    @Input()
    photos: Photo[] = [];
    public _albums: any[] = [];

    ngOnInit() {
        this.photos.forEach((element) => {
            this._albums.push({
                src: element.url,
                caption: '',
                thumb: element.url,
            });
        });
    }

    constructor(public _lightbox: Lightbox) {}

    open(index: number): void {
        // open lightbox
        this._lightbox.open(this._albums, index);
    }

    close(): void {
        // close lightbox programmatically
        this._lightbox.close();
    }
}
