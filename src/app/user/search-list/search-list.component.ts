import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent implements OnInit {
    @Input() users: User[];
    currentUser: User;

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
    }

    redirectToUserPage(user: User) {
        if (user.id === this.currentUser.id)
            this.router.navigate(['/user/main']);
        else
            this.router.navigate(['/user/view'], {
                queryParams: { id: user.id },
            });
    }
}
