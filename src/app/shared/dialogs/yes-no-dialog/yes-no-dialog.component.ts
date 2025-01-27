import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'app-yes-no',
    templateUrl: './yes-no-dialog.component.html',
    styleUrls: ['./yes-no-dialog.component.css'],
})
export class YesNoDialogComponent implements OnInit {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

    ngOnInit() {}
}
