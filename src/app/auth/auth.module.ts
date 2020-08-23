import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterConfirmComponent } from './register-confirm/register-confirm.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordresetComponent } from './forgotpasswordreset/forgotpasswordreset.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        RegisterConfirmComponent,
        ForgotpasswordComponent,
        ForgotpasswordresetComponent,
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
})
export class AuthModule {}
