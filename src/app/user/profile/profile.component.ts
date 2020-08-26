import { Component, OnInit } from '@angular/core';
import { User } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
    currentUser: User;

    constructor(public authService: AuthService) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }
}
