import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TestRoutingModule } from './test-routing.module';
import { ToolbarComponent } from './toolbar/toolbarcomponent';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';
import { FormComponent } from './form/form.component';
import { MultipleUploadPreviewComponent } from './multiple-upload-preview/multiple-upload-preview.component';
import { MultipleUploadPreview2Component } from './multiple-upload-preview-2/multiple-upload-preview-2.component';
import { DragNDropUploadComponent } from './drag-n-drop-upload/drag-n-drop-upload.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        FlexLayoutComponent,
        ExpansionPanelComponent,
        FormComponent,
        MultipleUploadPreviewComponent,
        MultipleUploadPreview2Component,
        DragNDropUploadComponent,
    ],
    imports: [
        CommonModule,
        TestRoutingModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatExpansionModule,
        CdkAccordionModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class TestModule {}
