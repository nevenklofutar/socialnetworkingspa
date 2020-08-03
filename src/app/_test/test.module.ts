import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestRoutingModule } from './test-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatExpansionModule } from '@angular/material/expansion';

import { ToolbarComponent } from './toolbar/toolbarcomponent';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

@NgModule({
    declarations: [
        ToolbarComponent,
        FlexLayoutComponent,
        ExpansionPanelComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        TestRoutingModule,
        MatToolbarModule,
        FlexLayoutModule,
        MatExpansionModule,
    ],
})
export class TestModule {}
