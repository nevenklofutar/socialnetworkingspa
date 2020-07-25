import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { UserToLogin } from 'src/backend/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    private userToLogin: UserToLogin = { username: '', password: '' };

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    buildForm() {
        this.loginForm = this.formBuilder.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    onSubmit() {
        this.userToLogin.username = this.loginForm.controls.username.value;
        this.userToLogin.password = this.loginForm.controls.password.value;

        this.authService.login(this.userToLogin).subscribe(
            (data) => {
                this.alertifyService.success('logged in');
            },
            (error) => {
                this.alertifyService.error('error logging in');
            }
        );
    }
}
