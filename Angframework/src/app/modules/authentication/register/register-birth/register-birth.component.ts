import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../services/state.service';
import {BsDatepickerConfig} from 'ngx-bootstrap';

@Component({
    selector: 'app-register-birth',
    templateUrl: './register-birth.component.html'
})
export class RegisterBirthComponent implements OnInit, OnDestroy {
    @Input() user: User;

    registerForm: FormGroup;
    private subscription: Subscription;

    constructor(private state: StateService<User>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const user = this.state.State || <User>{};
        this.registerForm = this.fb.group({
            dateOfBirth: user.age
        });

        this.state.ActiveStep.value.SetForm(this.registerForm.value);
        this.subscription = this.registerForm.valueChanges.subscribe(values => {
            this.state.Patch(values, this.registerForm.valid);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
