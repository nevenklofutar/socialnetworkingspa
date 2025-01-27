import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Likes } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class LikeService {
    baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    likePost(postId: number) {
        return this.http.post(this.baseUrl + 'posts/' + postId + '/likes', {});
    }

    getLikesForPost(postId: number) {
        return this.http.get<Likes>(
            this.baseUrl + 'posts/' + postId + '/likes'
        );
    }
}
