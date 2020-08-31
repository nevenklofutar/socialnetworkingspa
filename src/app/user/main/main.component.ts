import {
    Component,
    OnInit,
    ViewChild,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
} from '@angular/core';
import { User } from 'src/backend/interfaces';
import { AuthService } from 'src/backend/endpoints/auth.service';
import { PostListComponent } from 'src/app/shared/components/post-list/post-list.component';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
    @ViewChild(PostListComponent)
    postListComponent: PostListComponent;
    currentUser: User;

    constructor(
        public authService: AuthService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.ref.detectChanges();
    }

    files: any = [];

    uploadFile(event) {
        for (let index = 0; index < event.length; index++) {
            const element = event[index];
            this.files.push(element.name);
        }
    }
    deleteAttachment(index) {
        this.files.splice(index, 1);
    }
}
