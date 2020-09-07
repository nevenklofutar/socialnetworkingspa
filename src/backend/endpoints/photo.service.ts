import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PhotosForUpload } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class PhotoService {
    baseUrl = environment.apiUrl + 'photos';

    constructor(private http: HttpClient) {}

    uploadPhotos(photosForUpload: PhotosForUpload) {
        return this.http.post(this.baseUrl, photosForUpload);
    }
}
