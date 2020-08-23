import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

import { ToolbarComponent } from './toolbar/toolbarcomponent';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';
import { AccordioncdkComponent } from './accordioncdk/accordioncdk.component';
import { FormComponent } from './form/form.component';

export const routes: Routes = [
    { path: 'toolbar', component: ToolbarComponent },
    { path: 'flexlayout', component: FlexLayoutComponent },
    { path: 'expansionpanel', component: ExpansionPanelComponent },
    { path: 'accordion', component: AccordioncdkComponent },
    { path: 'form', component: FormComponent },
    // {
    //     path: 'test',
    //     children: [
    //         { path: 'toolbar', component: ToolbarComponent },
    //         { path: 'flexlayout', component: FlexLayoutComponent },
    //         { path: 'expansionpanel', component: ExpansionPanelComponent },
    //         { path: 'accordion', component: AccordioncdkComponent },
    //         { path: 'form', component: FormComponent },
    //     ],
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TestRoutingModule {}
