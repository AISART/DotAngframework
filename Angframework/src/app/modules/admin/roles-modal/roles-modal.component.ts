import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {User} from '../../../models/user';

@Component({
    selector: 'app-roles-modal',
    templateUrl: './roles-modal.component.html'
})
export class RolesModalComponent implements OnInit {
    @Output() updateSelectedRoles = new EventEmitter();
    user: User;
    roles: any[];

    constructor(public bsModalRef: BsModalRef) {
    }

    ngOnInit() {
    }

    updateRoles() {
        this.updateSelectedRoles.emit(this.roles);
        this.bsModalRef.hide();
    }

}
