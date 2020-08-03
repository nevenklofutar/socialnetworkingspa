import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ExpansionPanelComponent } from './expansion-panel/expansion-panel.component';

import { ToolbarComponent } from './toolbar/toolbarcomponent';
import { FlexLayoutComponent } from './flex-layout/flex-layout.component';

export const routes: Routes = [
    {
        path: 'test',
        children: [
            { path: 'toolbar', component: ToolbarComponent },
            { path: 'flexlayout', component: FlexLayoutComponent },
            { path: 'expansionpanel', component: ExpansionPanelComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class TestRoutingModule {}
