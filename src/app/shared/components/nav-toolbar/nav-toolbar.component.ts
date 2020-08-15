import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/backend/interfaces';
import { AuthEventsService } from '../../_events/auth-events.service';

@Component({
    selector: 'app-nav-toolbar',
    templateUrl: './nav-toolbar.component.html',
    styleUrls: ['./nav-toolbar.component.css'],
})
export class NavToolbarComponent implements OnInit {
    constructor(
        private authEventsService: AuthEventsService,
        private authService: AuthService,
        private router: Router
    ) {}
    currentUser: User;

    ngOnInit() {
        this.authEventsService.onSetCurrentUser$.subscribe((user) => {
            this.currentUser = user;
        });
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
