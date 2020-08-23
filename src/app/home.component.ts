import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    template: '',
})
export class HomeComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (this.authService.loggedIn()) this.router.navigate(['/user/main']);
        else this.router.navigate(['/auth/login']);
    }
}
