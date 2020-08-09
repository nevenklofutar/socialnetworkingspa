import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';

@NgModule({
    declarations: [PostComponent, PostListComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
    ],
    exports: [PostListComponent],
})
export class SharedModule {}
