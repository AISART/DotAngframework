import {Component, OnInit} from '@angular/core';
import {Message} from '../../../models/message';
import {PaginatedResult, Pagination} from '../../../models/pagination';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent implements OnInit {
    messages: Message[];
    pagination: Pagination;
    messageContainer = 'Unread';

    constructor(private userService: UserService,
                private authService: AuthService,
                private route: ActivatedRoute,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.route.data.subscribe(data => {
            this.messages = data['messages'].result;
            this.pagination = data['messages'].pagination;
        });
    }

    loadMessages() {
        this.userService.getMessages(this.authService.decodedToken.nameid,
                                     this.pagination.currentPage,
                                     this.pagination.itemsPerPage,
                                     this.messageContainer)
            .subscribe((res: PaginatedResult<Message[]>) => {
                this.messages = res.result;
                this.pagination = res.pagination;
        }, error => {
                this.toastr.error(error);
            });
    }

    deleteMessage(id: number) {
        this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
            this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
            this.toastr.success('This messages has been deleted');
        }, error => {
            this.toastr.error('Failed to the message');
        });
    }

    pageChanged(event: any): void {
        this.pagination.currentPage = event.page;
        this.loadMessages();
    }

}
