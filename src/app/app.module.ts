import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../app/material/material.module';
import { NavToolbarComponent } from '../app/shared/components/nav-toolbar/nav-toolbar.component';
import { HomeComponent } from './home.component';
import { NotFoundComponent } from './not-found.component';

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
    declarations: [
        AppComponent,
        NavToolbarComponent,
        HomeComponent,
        NotFoundComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MaterialModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                allowedDomains: [
                    'localhost:5000',
                    'localhost:5001',
                    'neven-sn.azurewebsites.net',
                ],
                disallowedRoutes: [
                    'localhost:5000/api/authorization',
                    'localhost:5001/api/authorization',
                    'neven-sn.azurewebsites.net/api/authorization',
                ],
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
