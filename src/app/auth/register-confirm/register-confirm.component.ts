import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { RegisterConfirmParams } from 'src/backend/interfaces';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';

@Component({
    selector: 'app-register-confirm',
    templateUrl: './register-confirm.component.html',
    styleUrls: ['./register-confirm.component.css'],
})
export class RegisterConfirmComponent implements OnInit {
    registerConfirmParams: RegisterConfirmParams = { email: '', token: '' };
    registrationSuccess = false;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertifyService: AlertifyService,
        private router: Router
    ) {
        this.route.queryParams.subscribe((params) => {
            this.registerConfirmParams.email = params['email'];
            this.registerConfirmParams.token = decodeURIComponent(
                params['token']
            );
            console.log(this.registerConfirmParams.token);
        });
    }

    ngOnInit() {
        this.logout();
        this.authService.registerConfirm(this.registerConfirmParams).subscribe(
            () => {
                // TODO: check for multiple confirm registration attempt on backend
                // TODO: backend is returning success for any token ????
                //this.registrationSuccess = true;
                console.log('success register confirm');
            },
            (error) => {
                this.alertifyService.error(error.error.title);
                console.log('error register confirm');
                console.log(error.error);
            }
        );
    }

    buttonClick() {
        this.redirectToLogin();
    }

    logout() {
        this.authService.logout();
    }

    redirectToLogin() {
        //this.router.navigate(['/auth/login']);
    }
}
