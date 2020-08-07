import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: 'main', component: MainComponent },
            { path: 'profile', component: ProfileComponent },
            { path: 'search', component: SearchComponent },
            { path: 'view', component: ViewComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
