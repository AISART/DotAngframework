import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {StateService} from '../../../../services/state.service';

@Component({
    selector: 'app-register-account',
    templateUrl: './register-account.component.html'
})
export class RegisterAccountComponent implements OnInit, OnDestroy {
    @Input() user: User;
    registerForm: FormGroup;

    private subscription: Subscription;

    constructor(protected state: StateService<User>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const user = this.state.State || <User>{};
        this.registerForm = this.fb.group({
            username: user.userName,
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
            confirmPassword: ['', Validators.required],
            recaptcha: ['', Validators.required]
        }, {validator: this.passwordMatchValidator});

        this.state.ActiveStep.value.SetForm(this.registerForm.value);
        this.subscription = this.registerForm.valueChanges.subscribe(values => this.state.Patch(values, this.registerForm.valid));
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }


    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
