import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {User} from '../../models/user';
import {Subscription} from 'rxjs';
import {StateService} from '../../services/state.service';

@Component({
    selector: 'app-register-city-country',
    templateUrl: './register-city-country.component.html'
})
export class RegisterCityCountryComponent implements OnInit, OnDestroy {
    @Input() user: User;

    registerForm: FormGroup;
    private subscription: Subscription;

    constructor(private state: StateService<User>,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        const user = this.state.State || <User>{};

        this.registerForm = this.fb.group({
            city: [user.city],
            country: [user.country]
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
