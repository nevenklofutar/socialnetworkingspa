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
import { CreatePostComponent } from './create-post/create-post.component';
import { CreatePostUploadImagesComponent } from './create-post-upload-images/create-post-upload-images.component';

@NgModule({
    declarations: [
        MainComponent,
        ProfileComponent,
        SearchComponent,
        SearchListComponent,
        ViewComponent,
        CreatePostComponent,
        CreatePostUploadImagesComponent,
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
