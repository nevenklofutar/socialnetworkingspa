import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { LightboxModule } from 'ngx-lightbox';

import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { YesNoDialogComponent } from './dialogs/yes-no-dialog/yes-no-dialog.component';
import { EditDialogComponent } from './dialogs/edit-dialog/edit-dialog.component';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { DragNDropDirective } from './directives/drag-n-drop.directive';

const components = [
    PostComponent,
    PostListComponent,
    YesNoDialogComponent,
    EditDialogComponent,
    ImageGalleryComponent,
];
const directives = [DragNDropDirective];

const declarations = [...components, ...directives];

@NgModule({
    declarations: [...declarations],
    imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatDialogModule,
        LightboxModule,
    ],
    exports: [...declarations],
})
export class SharedModule {}
