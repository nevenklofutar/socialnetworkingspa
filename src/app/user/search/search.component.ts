import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../../backend/endpoints/user.service';
import { SearchUsersParams, User } from '../../../backend/interfaces';
import { AlertifyService } from 'src/app/shared/_services/alertify.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
    users: User[];
    searchForm: FormGroup;
    processingForm = false;

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private alertifyService: AlertifyService
    ) {}

    ngOnInit() {
        this.buildForm();
    }

    onSubmit() {
        this.processingForm = true;

        let searchTerm = this.searchForm.get('searchField').value;
        let searchUsersParams: SearchUsersParams = { searchTerm: searchTerm };
        this.userService.searchUsers(searchUsersParams).subscribe(
            (response) => {
                // response.forEach((user) => {
                //     console.log(user);
                // });
                this.users = response;
            },
            (error) => {
                this.alertifyService.error(error.error.title);
            }
        );

        this.processingForm = false;
    }

    buildForm() {
        this.searchForm = this.formBuilder.group({
            searchField: ['', Validators.required],
        });
    }
}
