import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

import { ToolbarComponent } from './toolbar/toolbarcomponent';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { AccordioncdkComponent } from './accordioncdk/accordioncdk.component';
import { FormComponent } from './form/form.component';
import { MultipleUploadPreviewComponent } from './multiple-upload-preview/multiple-upload-preview.component';
import { MultipleUploadPreview2Component } from './multiple-upload-preview-2/multiple-upload-preview-2.component';
import { DragNDropUploadComponent } from './drag-n-drop-upload/drag-n-drop-upload.component';

export const routes: Routes = [
    { path: 'toolbar', component: ToolbarComponent },
    { path: 'flexlayout', component: FlexLayoutComponent },
    { path: 'expansionpanel', component: ExpansionPanelComponent },
    { path: 'accordion', component: AccordioncdkComponent },
    { path: 'form', component: FormComponent },
    { path: 'multiupload', component: MultipleUploadPreviewComponent },
    { path: 'multiupload2', component: MultipleUploadPreview2Component },
    { path: 'dragndrop', component: DragNDropUploadComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TestRoutingModule {}
