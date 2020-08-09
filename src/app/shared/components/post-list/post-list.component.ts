import {
    Component,
    OnInit,
    Input,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Post } from 'src/backend/interfaces';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
    @Input() posts: Post[];

    constructor() {}

    ngOnInit() {}

    trackByPost(index, item: Post) {
        return item.id;
    }
}
