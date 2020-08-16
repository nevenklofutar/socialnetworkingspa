import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Post, PostForUpdate } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    baseUrl = environment.apiUrl + 'posts';

    constructor(private http: HttpClient) {}

    createPost(post: Partial<Post>) {
        return this.http.post(this.baseUrl, post);
    }

    getPostsForUser(userId: string) {
        return this.http.post<Post[]>(this.baseUrl + '/user', {
            createdByUserId: userId,
        });
    }

    deletePost(postId: number) {
        return this.http.delete(this.baseUrl + '/' + postId);
    }

    updatePost(post: PostForUpdate) {
        return this.http.put(this.baseUrl + '/' + post.id, post);
    }
}
