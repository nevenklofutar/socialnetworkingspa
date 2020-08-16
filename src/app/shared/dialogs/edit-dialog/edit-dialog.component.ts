import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-edit',
    templateUrl: './edit-dialog.component.html',
    styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
    editForm: FormGroup;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<EditDialogComponent>,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.buildEditForm();
        this.updateEditForm();
    }

    buildEditForm() {
        this.editForm = this.formBuilder.group({
            editValue: [''],
            editId: [''],
        });
    }

    updateEditForm() {
        this.editForm.patchValue({
            editId: this.data.id,
            editValue: this.data.value,
        });
    }

    close() {
        this.dialogRef.close(null);
    }

    submit() {
        let id = this.editForm.get('editId').value;
        let value = this.editForm.get('editValue').value;
        let response: any = { id: id, value: value };
        this.dialogRef.close(response);
    }
}
