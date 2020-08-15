import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../../../backend/interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthEventsService {
    private onSetCurrentUserRx = new Subject<User>();
    public onSetCurrentUser$ = this.onSetCurrentUserRx.asObservable();

    constructor() {}

    setCurrentUser(user: User) {
        this.onSetCurrentUserRx.next(user);
    }
}
