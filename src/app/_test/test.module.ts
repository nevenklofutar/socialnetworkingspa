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

@NgModule({
    declarations: [
        ToolbarComponent,
        FlexLayoutComponent,
        ExpansionPanelComponent,
        FormComponent,
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
