import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CommentToAdd, Comment } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class CommentService {
    baseUrl = environment.apiUrl + 'posts';

    constructor(private http: HttpClient) {}

    createComment(comment: CommentToAdd) {
        return this.http.post(
            this.baseUrl + '/' + comment.postId + '/comments',
            comment
        );
    }

    getCommentsForPost(postId: number) {
        return this.http.get<Comment[]>(
            this.baseUrl + '/' + postId + '/comments'
        );
    }
}
