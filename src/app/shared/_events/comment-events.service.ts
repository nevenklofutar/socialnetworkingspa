import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
    CommentToAdd,
    CommentForUpdate,
    CommentForDelete,
} from '../../../backend/interfaces';

@Injectable({
    providedIn: 'root',
})
export class CommentEventsService {
    private onCommentAddRx = new Subject<CommentToAdd>();
    public onCommentAdd$ = this.onCommentAddRx.asObservable();

    private onCommentUpdateRx = new Subject<CommentForUpdate>();
    public onCommentUpdate$ = this.onCommentUpdateRx.asObservable();

    private onCommentDeleteRx = new Subject<CommentForDelete>();
    public onCommentDelete$ = this.onCommentDeleteRx.asObservable();

    constructor() {}

    addComment(comment: CommentToAdd) {
        this.onCommentAddRx.next(comment);
    }

    updateComment(comment: CommentForUpdate) {
        this.onCommentUpdateRx.next(comment);
    }

    deleteComment(comment: CommentForDelete) {
        this.onCommentDeleteRx.next(comment);
    }
}
