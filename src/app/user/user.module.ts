import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

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
        CommonModule,
        UserRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        SharedModule,
    ],
})
export class UserModule {}
