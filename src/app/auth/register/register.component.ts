import { Component, OnInit } from '@angular/core';
import {
    FormControl,
    Validators,
    FormGroup,
    FormBuilder,
} from '@angular/forms';
import { UserToRegister } from '../../../backend/interfaces';
import { AuthService } from '../../../backend/endpoints/auth.service';
import { AlertifyService } from '../../shared/_services/alertify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    public registrationForm: FormGroup;
    private userToCreate: UserToRegister;
    processingForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit() {
        this.buildForm();

        this.registrationForm
            .get('password')
            .valueChanges.subscribe((password: string) => {
                this.registrationForm
                    .get('passwordConfirm')
                    .updateValueAndValidity();
            });
    }

    onSubmit() {
        this.processingForm = true;
        this.userToCreate = new UserToRegister();
        this.userToCreate.email = this.registrationForm.controls.email.value;
        this.userToCreate.firstName = this.registrationForm.controls.firstName.value;
        this.userToCreate.lastName = this.registrationForm.controls.lastName.value;
        this.userToCreate.phoneNumber = this.registrationForm.controls.phonenumber.value;
        this.userToCreate.userName = this.registrationForm.controls.username.value;
        this.userToCreate.password = this.registrationForm.controls.password.value;
        this.userToCreate.roles = ['User'];

        this.authService
            .register(this.userToCreate)
            .subscribe(
                (data) => {
                    this.alertifyService.success(
                        'Registered successfully, check your email.'
                    );
                    this.registrationForm.disable();
                },
                (error) => {
                    let errors: string = ''; //error.error.title;

                    Object.keys(error.error.errors).forEach((element) => {
                        errors =
                            errors + '<br/>' + error.error.errors[element][0];
                    });

                    this.alertifyService.error(errors);
                }
            )
            .add(() => {
                this.processingForm = false;
            });
    }

    buildForm() {
        this.registrationForm = this.formBuilder.group({
            firstName: [''],
            lastName: [''],
            email: ['', [Validators.required, Validators.email]],
            phonenumber: new FormControl(''),
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            passwordConfirm: [
                '',
                [Validators.required, this.customValidatorPasswordsMatch],
            ],
        });
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
