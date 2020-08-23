import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoggedInGuard } from '../shared/_guards/loggedIn.guard';

import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';

export const routes: Routes = [
    { path: 'main', component: MainComponent, canActivate: [LoggedInGuard] },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoggedInGuard],
    },
    {
        path: 'search',
        component: SearchComponent,
        canActivate: [LoggedInGuard],
    },
    { path: 'view', component: ViewComponent, canActivate: [LoggedInGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
