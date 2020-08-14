import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostEventsService {
    private onPostDeleteRx = new Subject<number>();
    public onPostDelete$ = this.onPostDeleteRx.asObservable();

    private onPostLikeToggleRx = new Subject<number>();
    public onPostLikeToggle$ = this.onPostLikeToggleRx.asObservable();

    constructor() {}

    deletePost(postId: number) {
        this.onPostDeleteRx.next(postId);
    }

    toggleLike(postId: number) {
        this.onPostLikeToggleRx.next(postId);
    }
}
