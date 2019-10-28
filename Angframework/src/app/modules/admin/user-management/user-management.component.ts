import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {AdminService} from '../../../services/admin.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {RolesModalComponent} from '../roles-modal/roles-modal.component';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-user-management',
    templateUrl: './user-management.component.html'
})
export class UserManagementComponent implements OnInit {
    users: User[];
    bsModalRef: BsModalRef;

    constructor(private adminService: AdminService,
                private toastr: ToastrService,
                private modalService: BsModalService) {
    }

    ngOnInit() {
        this.getUsersWithRoles();
    }

    getUsersWithRoles() {
        this.adminService.getUserWithRoles().subscribe((users: User[]) => {
            this.users = users;
        }, error => {
            this.toastr.error(error);
        });
    }

    editRolesModal(user: User) {
        const initialState = {
            user,
            roles: this.getRolesArray(user)
        };
        this.bsModalRef = this.modalService.show(RolesModalComponent, {initialState});
        this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
            const rolesToUpdate = {
                roleNames: [...values.filter(el => el.checked === true).map(el => el.name)]
            };
            if (rolesToUpdate) {
                this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
                    user.roles = [...rolesToUpdate.roleNames];
                }, error => {
                    this.toastr.error(error);
                });
            }
        });
    }

    DeleteUser(id: number) {
        this.adminService.deleteUser(id).subscribe(() => {
            this.users.splice(this.users.findIndex(m => m.id === id), 1);
            this.toastr.success('This user has been deleted');
        }, error => {
            this.toastr.error('Failed to the user');
        });
    }

    private getRolesArray(user) {
        const roles = [];
        const userRoles = user.roles;
        const availableRoles: any[] = [
            {name: 'Admin', value: 'Admin'},
            {name: 'Moderator', value: 'Moderator'},
            {name: 'Member', value: 'Member'},
            {name: 'VIP', value: 'VIP'}
        ];

        for (let i = 0; i < availableRoles.length; i++) {
            let isMatch = false;
            for (let j = 0; j < userRoles.length; j++) {
                if (availableRoles[i].name === userRoles[j]) {
                    isMatch = true;
                    availableRoles[i].checked = true;
                    roles.push(availableRoles[i]);
                    break;
                }
            }
            if (!isMatch) {
                availableRoles[i].checked = false;
                roles.push(availableRoles[i]);
            }
        }
        return roles;
    }
}
