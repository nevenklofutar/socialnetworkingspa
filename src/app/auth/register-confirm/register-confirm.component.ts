import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { RegisterConfirmParams } from 'src/backend/interfaces';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';

@Component({
    selector: 'app-register-confirm',
    templateUrl: './register-confirm.component.html',
    styleUrls: ['./register-confirm.component.css'],
})
export class RegisterConfirmComponent implements OnInit {
    //http://localhost:4200/auth/registerconfirm?
    //email=neven.klofutar@gmail.com&
    // token=CfDJ8KoKH6%2Fvd39Bh4t9LViPlst67tjUJwFDpxlTxH80LPZDHX2uwRGEIk3apQWXXh%20rbdlsKi0qCay86izElPR%2FZpllmkgFtWI63VjMlC%20MeLs%2FopQ836vHVsJzvvaVOHpwTQZepBbFuHhyz5JkQALZs77%2FPw90c6RIA91rAP6UClZ9ifVa%20%2FnWjq%20AvhWxhPp4coAL5kUW5IwdOxcz9HIo2VJDa8EoxYH%2FDSXaiaSved9Ue7ngi6XNWNPy0MW0KmigpQ%3D%3D
    registerConfirmParams: RegisterConfirmParams = { email: '', token: '' };

    constructor(
        private route: ActivatedRoute,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) {
        this.route.queryParams.subscribe((params) => {
            this.registerConfirmParams.email = params['email'];
            this.registerConfirmParams.token = params['token'];
        });
    }

    ngOnInit() {
        console.log('init');
        this.authService.registerConfirm(this.registerConfirmParams).subscribe(
            () => {
                this.alertifyService.success(
                    'Confirmed you email, go to login.'
                );
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }
}
