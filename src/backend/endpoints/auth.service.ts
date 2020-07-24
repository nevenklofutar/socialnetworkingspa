import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User, RegisterConfirmParams } from '../interfaces';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = environment.apiUrl + 'authentication/';

    constructor(private http: HttpClient) {}

    register(user: User) {
        return this.http.post(this.baseUrl + 'register', user);
    }

    registerConfirm(params: RegisterConfirmParams) {
        return this.http.post(this.baseUrl + 'confirmregisteremail', params);
    }
}
