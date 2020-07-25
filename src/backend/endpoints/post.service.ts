import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    baseUrl = environment.apiUrl + 'posts';

    constructor(private http: HttpClient) {}

    createPost(post: Post) {
        return this.http.post(this.baseUrl, post);
    }

    getPosts() {
        return this.http.get<Post[]>(this.baseUrl);
    }
}
