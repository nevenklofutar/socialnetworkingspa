import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile/profile.component';
import { MainComponent } from './main/main.component';

export const routes: Routes = [
    {
        path: 'user',
        children: [
            { path: 'main', component: MainComponent },
            { path: 'profile', component: ProfileComponent },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class UserRoutingModule {}
