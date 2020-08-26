import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserForForgotPasswordConfirm } from 'src/backend/interfaces';

@Component({
    selector: 'app-forgotpasswordreset',
    templateUrl: './forgotpasswordreset.component.html',
    styleUrls: ['./forgotpasswordreset.component.css'],
})
export class ForgotpasswordresetComponent implements OnInit {
    userForForgotPasswordConfirm: UserForForgotPasswordConfirm = {
        email: null,
        token: null,
        password: null,
        passwordConfirm: null,
    };
    formConfirm: FormGroup;
    pageStatus: number = 0; // 0 - show error msg, no qstring data; 1 - render form for pass reset

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService,
        private router: Router
    ) {
        this.route.queryParams.subscribe((params) => {
            this.userForForgotPasswordConfirm.email = params['email'];
            this.userForForgotPasswordConfirm.token = decodeURIComponent(
                params['token']
            );
        });
    }

    ngOnInit() {
        this.setPageStatus();
        this.buildPageControls();
        this.buildForm();
    }

    setPageStatus() {
        console.log(this.userForForgotPasswordConfirm);

        if (
            this.userForForgotPasswordConfirm &&
            this.userForForgotPasswordConfirm.email &&
            this.userForForgotPasswordConfirm.email !== 'undefined' &&
            this.userForForgotPasswordConfirm.token &&
            this.userForForgotPasswordConfirm.token !== 'undefined'
        ) {
            this.pageStatus = 1;
        }
    }

    buildPageControls() {
        if (this.pageStatus === 1) this.buildForm();
        else if (this.pageStatus === 0) this.router.navigate(['/auth/login']); // redirect to login if stuff is missing from qstring
    }

    buildForm() {
        this.formConfirm = this.formBuilder.group({
            password: ['', [Validators.required]],
            passwordConfirm: [
                '',
                [Validators.required, this.customValidatorPasswordsMatch],
            ],
        });
    }

    onSubmit() {
        this.userForForgotPasswordConfirm.password = this.formConfirm.get(
            'password'
        ).value;
        this.userForForgotPasswordConfirm.passwordConfirm = this.formConfirm.get(
            'passwordConfirm'
        ).value;

        this.authService
            .forgotpasswordreset(this.userForForgotPasswordConfirm)
            .subscribe(
                () => {
                    this.alertifyService.success(
                        'Your password has been changed.'
                    );
                    this.router.navigate(['/auth/login']);
                },
                (error) => {
                    this.alertifyService.error(error.error.title);
                }
            );
    }

    private customValidatorPasswordsMatch(formControl: FormControl) {
        let passwordControl = formControl.parent?.get('password');
        let passwordConfirmControl = formControl.parent?.get('passwordConfirm');

        return passwordControl?.value === passwordConfirmControl?.value
            ? null
            : {
                  mismatch: true,
              };
    }
}
