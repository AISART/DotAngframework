import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {PaginatedResult, Pagination} from '../../../models/pagination';
import {AuthService} from '../../../services/auth.service';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
    users: User[];
    pagination: Pagination;
    likesParam: string;

    constructor(private authService: AuthService,
                private userService: UserService,
                private route: ActivatedRoute,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.users = data['users'].result;
            this.pagination = data['users'].pagination;
        });
        this.likesParam = 'Likers';
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadUsers();
    }

    loadUsers() {
        this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
            .subscribe((res: PaginatedResult<User[]>) => {
                this.users = res.result;
                this.pagination = res.pagination;
            }, error => {
                this.toastr.error(error);
            });
    }

}
