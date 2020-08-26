import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { UserForForgotPassword } from 'src/backend/interfaces';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';

@Component({
    selector: 'app-forgotpassword',
    templateUrl: './forgotpassword.component.html',
    styleUrls: ['./forgotpassword.component.css'],
})
export class ForgotpasswordComponent implements OnInit {
    formEmail: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.formEmail = this.formBuilder.group({
            emailInput: ['', [Validators.required, Validators.email]],
        });
    }

    onSubmit() {
        let email = this.formEmail.get('emailInput').value;
        let userForForgotPass: UserForForgotPassword = { email };
        this.authService.forgotpassword(userForForgotPass).subscribe(
            () => {
                this.alertifyService.success(
                    'Reset link has been sent to your email.'
                );
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }
}
