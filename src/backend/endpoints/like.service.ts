import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    likePost(postId: number) {
        return this.http.post(this.baseUrl + 'posts/' + postId + '/likes', {});
    }

    getLikesCountForPost(postId: number) {
        return this.http.get<number>(
            this.baseUrl + 'posts/' + postId + '/likes'
        );
    }
}
