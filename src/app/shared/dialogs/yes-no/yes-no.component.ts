import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-yes-no',
    templateUrl: './yes-no.component.html',
    styleUrls: ['./yes-no.component.css'],
})
export class YesNoComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
}
