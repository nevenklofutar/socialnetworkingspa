import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import {
    UserToRegister,
    RegisterConfirmParams,
    UserToLogin,
    User,
} from '../interfaces';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { AuthEventsService } from '../../app/shared/_events/auth-events.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    baseUrl = environment.apiUrl + 'authentication/';
    jwtHelper = new JwtHelperService();

    private decodedToken: any = null;
    private currentUser: User = null;

    constructor(
        private http: HttpClient,
        private authEventsService: AuthEventsService
    ) {}

    register(user: UserToRegister) {
        return this.http.post(this.baseUrl + 'register', user);
    }

    registerConfirm(params: RegisterConfirmParams) {
        return this.http.post(this.baseUrl + 'confirmregisteremail', params);
    }

    login(userToLogin: UserToLogin) {
        return this.http.post(this.baseUrl + 'login', userToLogin).pipe(
            map((response: any) => {
                if (response) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('user', JSON.stringify(response.user));
                    this.decodedToken = this.jwtHelper.decodeToken(
                        response.token
                    );
                    this.currentUser = response.user;
                    this.authEventsService.setCurrentUser(this.currentUser);
                }
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.decodedToken = null;
        this.currentUser = null;
        this.authEventsService.setCurrentUser(this.currentUser);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    loggedIn() {
        const token = localStorage.getItem('token');

        if (this.jwtHelper.isTokenExpired(token)) {
            this.logout();
            return false;
        }
        return true;
    }
}
