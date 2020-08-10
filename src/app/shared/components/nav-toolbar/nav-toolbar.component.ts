import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { routes } from 'src/app/auth/auth-routing.module';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-nav-toolbar',
    templateUrl: './nav-toolbar.component.html',
    styleUrls: ['./nav-toolbar.component.css'],
})
export class NavToolbarComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {}

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
