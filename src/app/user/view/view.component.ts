import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/auth/auth-routing.module';

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
    constructor(private route: ActivatedRoute) {
        this.route.queryParams.subscribe((params) => {
            let id = params['id'];
            console.log(id);
        });
    }

    ngOnInit() {}
}
