import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Defined} from '../../libs/utilities';

@Component({
    selector: 'app-submit-button',
    templateUrl: './submit-button.component.html'
})
export class SubmitButtonComponent implements OnInit, OnChanges {
    @Output() onClick: EventEmitter<any> = new EventEmitter();

    @Input() Valid: boolean = null;
    @Input() Text: string = '';

    constructor() {
    }

    ngOnInit() {
    }

    /**
     *
     */
    ngOnChanges(changes: SimpleChanges) {
        if (Defined(changes['Valid']) && Defined(changes['Valid'].currentValue)) {
            this.Valid = changes['Valid'].currentValue;
        }
    }

    /**
     *
     */
    OnClick() {
        if (!this.Valid) {
            return;
        }
        this.onClick.emit();
    }
}
