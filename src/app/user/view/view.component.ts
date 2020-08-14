import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User, Post } from 'src/backend/interfaces';
import { UserService } from 'src/backend/endpoints/user.service';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';
import { PostService } from 'src/backend/endpoints/post.service';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
    userId: string;
    user: User;
    posts: Post[];

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private alertifyService: AlertifyService
    ) {
        this.route.queryParams.subscribe((params) => {
            this.userId = params['id'];
        });
    }

    ngOnInit() {
        this.userService.getUserById(this.userId).subscribe(
            (response) => {
                this.user = response;
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );
    }
}
