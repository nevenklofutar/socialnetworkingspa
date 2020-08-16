import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';

import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';

@NgModule({
    declarations: [
        PostComponent,
        PostListComponent,
        YesNoDialogComponent,
        EditDialogComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        FlexLayoutModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
    ],
    exports: [PostListComponent],
})
export class SharedModule {}
