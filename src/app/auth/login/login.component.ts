import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { UserToLogin } from 'src/backend/interfaces';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    private userToLogin: UserToLogin = { username: '', password: '' };
    processingForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService,
        private router: Router
    ) {}

    ngOnInit() {
        this.checkIsLogin();
        this.buildForm();
    }

    checkIsLogin() {
        // if (this.authService.loggedIn())
        //     this.router.navigate(['/user/main']);
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.processingForm = true;
        this.userToLogin.username = this.loginForm.controls.username.value;
        this.userToLogin.password = this.loginForm.controls.password.value;

        this.authService
            .login(this.userToLogin)
            .subscribe(
                (data) => {
                    this.alertifyService.success('logged in');
                    this.router.navigate(['/user/main']);
                },
                (error) => {
                    this.alertifyService.error('error logging in');
                }
            )
            .add(() => {
                this.processingForm = false;
            });
    }
}
