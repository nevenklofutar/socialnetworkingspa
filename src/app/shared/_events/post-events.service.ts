import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PostForUpdate } from 'src/backend/interfaces';

@Injectable({
    providedIn: 'root',
})
export class PostEventsService {
    private onPostDeleteRx = new Subject<number>();
    public onPostDelete$ = this.onPostDeleteRx.asObservable();

    private onPostLikeToggleRx = new Subject<number>();
    public onPostLikeToggle$ = this.onPostLikeToggleRx.asObservable();

    private onPostUpdateRx = new Subject<PostForUpdate>();
    public onPostUpdate$ = this.onPostUpdateRx.asObservable();

    constructor() {}

    deletePost(postId: number) {
        this.onPostDeleteRx.next(postId);
    }

    toggleLike(postId: number) {
        this.onPostLikeToggleRx.next(postId);
    }

    updatePost(post: PostForUpdate) {
        this.onPostUpdateRx.next(post);
    }
}
