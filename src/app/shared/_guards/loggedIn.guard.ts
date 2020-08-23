import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../../../backend/endpoints/auth.service';

@Injectable({
    providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    canActivate(next: ActivatedRouteSnapshot): boolean {
        if (!this.authService.loggedIn()) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }
}
