import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../services/state.service';
import {User} from '../../../../models/user';

@Component({
    selector: 'app-register-gender',
    templateUrl: './register-gender.component.html'
})
export class RegisterGenderComponent implements OnInit, OnDestroy {
    @Input() user: User;

    registerForm: FormGroup;
    private subscription: Subscription;

    constructor(private state: StateService<User>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const user = this.state.State || <User>{};
        this.registerForm = this.fb.group({
            gender: [user.gender, [Validators.required]]
        });

        // Initial patch is needed to add the object to the state.
        this.state.Patch(this.registerForm.value, this.registerForm.valid);
        this.subscription = this.registerForm.valueChanges.subscribe(values => {
            this.state.Patch(values, this.registerForm.valid);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
