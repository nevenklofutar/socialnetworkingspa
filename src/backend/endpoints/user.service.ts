import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SearchUsersParams, User } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.apiUrl + 'users';

    constructor(private http: HttpClient) {}

    getUserById(userId: string) {
        return this.http.get<User>(this.baseUrl + '/' + userId);
    }

    searchUsers(searchUsersParams: SearchUsersParams) {
        return this.http.post<User[]>(
            this.baseUrl + '/search',
            searchUsersParams
        );
    }
}
