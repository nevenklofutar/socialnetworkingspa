import { Component, OnInit } from '@angular/core';
import { User } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);
    passwordFormControl = new FormControl('', [Validators.required]);
    usernameFormControl = new FormControl('', [Validators.required]);

    constructor(private authService: AuthService) {}

    ngOnInit() {}
}
