import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/backend/interfaces';

@Component({
    selector: 'app-nav-toolbar',
    templateUrl: './nav-toolbar.component.html',
    styleUrls: ['./nav-toolbar.component.css'],
})
export class NavToolbarComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}
    currentUser: User;

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']);
    }

    search() {
        this.router.navigate(['/user/search']);
    }

    home() {
        this.router.navigate(['/user/main']);
    }
}
