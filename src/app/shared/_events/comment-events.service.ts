import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CommentToAdd } from '../../../backend/interfaces';

@Injectable({
    providedIn: 'root',
})
export class CommentEventsService {
    private onCommentAddRx = new Subject<CommentToAdd>();
    public onCommentAdd$ = this.onCommentAddRx.asObservable();

    constructor() {}

    addComment(comment: CommentToAdd) {
        this.onCommentAddRx.next(comment);
    }
}
