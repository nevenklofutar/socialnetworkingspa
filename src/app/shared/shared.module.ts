import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
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
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
    ],
    exports: [PostListComponent],
})
export class SharedModule {}
