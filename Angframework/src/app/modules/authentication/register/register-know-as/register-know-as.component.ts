import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../services/state.service';

@Component({
    selector: 'app-register-know-as',
    templateUrl: './register-know-as.component.html'
})
export class RegisterKnowAsComponent implements OnInit, OnDestroy {
    @Input() user: User;

    registerForm: FormGroup;
    private subscription: Subscription;

    constructor(private state: StateService<User>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const user = this.state.State || <User>{};
        this.registerForm = this.fb.group({
            knownAs: [user.knownAs, [Validators.required]]
        });

        this.state.Patch(this.registerForm.value, this.registerForm.valid);
        this.subscription = this.registerForm.valueChanges.subscribe(values => {
            this.state.Patch(values, this.registerForm.valid);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
