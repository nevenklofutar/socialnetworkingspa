import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ForgotpasswordresetComponent } from './forgotpasswordreset/forgotpasswordreset.component';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotpasswordComponent,
        ForgotpasswordresetComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
})
export class AuthModule {}
