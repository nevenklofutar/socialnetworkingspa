import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../backend/interfaces';

@Component({
    selector: 'app-search-list',
    templateUrl: './search-list.component.html',
    styleUrls: ['./search-list.component.css'],
})
export class SearchListComponent implements OnInit {
    @Input() users: User[];

    constructor() {}

    ngOnInit() {}
}
