import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { UserRoutingModule } from './user-routing.module';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { SearchListComponent } from './search-list/search-list.component';
import { ViewComponent } from './view/view.component';

@NgModule({
    declarations: [
        MainComponent,
        ProfileComponent,
        SearchComponent,
        SearchListComponent,
        ViewComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
    ],
})
export class UserModule {}
