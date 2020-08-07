import { Component, OnInit } from '@angular/core';
// Get animations and state class
import {
    MatExpansionPanelState,
    matExpansionAnimations,
} from '@angular/material/expansion';
import { CdkAccordionItem } from '@angular/cdk/accordion';

@Component({
    selector: 'app-accordioncdk',
    templateUrl: './accordioncdk.component.html',
    styleUrls: ['./accordioncdk.component.css'],
    animations: [matExpansionAnimations.bodyExpansion],
})
export class AccordioncdkComponent extends CdkAccordionItem implements OnInit {
    ngOnInit() {}

    getExpandedState(): MatExpansionPanelState {
        return this.expanded ? 'expanded' : 'collapsed';
    }
}
