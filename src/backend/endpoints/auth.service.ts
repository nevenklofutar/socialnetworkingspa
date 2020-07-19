import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = environment.apiUrl + 'authentication/';

    constructor(private http: HttpClient) {}

    login(model: any) {
        return this.http.post(this.baseUrl + 'login', model);
    }

    register(user: User) {
        return this.http.post(this.baseUrl + 'register', user);
    }
}
