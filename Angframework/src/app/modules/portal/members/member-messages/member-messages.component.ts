import {Component, Input, OnInit} from '@angular/core';
import {Message} from '../../../../models/message';
import {UserService} from '../../../../services/user.service';
import {AuthService} from '../../../../services/auth.service';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-member-messages',
    templateUrl: './member-messages.component.html'
})
export class MemberMessagesComponent implements OnInit {
    @Input() recipientId: number;
    messages: Message[];
    newMessage: any = {};

    constructor(private userService: UserService,
                private authService: AuthService,
                private toastr: ToastrService) {
    }

    ngOnInit() {
        this.loadMessages();
    }

    loadMessages() {
        const currentUserId = this.authService.decodedToken.nameid;
        this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
            .pipe(tap(messages => {
                for (let i = 0; i < messages.length; i++) {
                    if (messages[i].isRead === false && messages[i].recipientId === currentUserId) {
                        this.userService.markAsRead(currentUserId, messages[i].id);
                    }
                }
            }))
            .subscribe(messages => {
            this.messages = messages;
        }, error => {
            this.toastr.error(error);
        });
    }

    sendMessage() {
        this.newMessage.recipientId = this.recipientId;
        this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message: Message) => {
            this.messages.unshift(message);
            this.newMessage.content = '';
        }, error => {
            this.toastr.error(error);
        });
    }

}
