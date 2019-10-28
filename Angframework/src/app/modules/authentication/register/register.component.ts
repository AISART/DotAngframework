import {Component, OnInit, Output, EventEmitter, OnDestroy, ChangeDetectorRef} from '@angular/core';
import {FormGroup } from '@angular/forms';
import {User} from '../../../models/user';
import {StateService, Step} from '../../../services/state.service';
import {Subscription} from 'rxjs';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, OnDestroy {
    @Output() onFinish: EventEmitter<void> = new EventEmitter();

    State: User;
    ActiveStep: Step<any>;
    FinishClicked = false;

    @Output() cancelRegister = new EventEmitter();

    user: User;

    // Subscriptions
    private subscription: Subscription = new Subscription();

    protected OnActiveStepChange(step: Step<any>) {
    }

    get Steps(): Step<any>[] {
        return this.state.Steps;
    }

    get ActiveStepIndex(): number {
        return this.state.FindActiveStepIndex();
    }

    constructor(protected cd: ChangeDetectorRef,
                protected state: StateService<User>,
                private toastr: ToastrService,
                private authService: AuthService,
                private router: Router) {

        this.State = this.state.State;
        this.state.ActiveStep.subscribe(step => {
            this.ActiveStep = step;
            this.OnActiveStepChange(step);
        });
    }

    async ngOnInit() {
        this.state.Initialize(<User>{}, [
            new Step(0, true, false),
            new Step(1, false, true),
            new Step(2, false, true),
            new Step(3, false, true),
            new Step(4, false, true)
        ]);

        this.subscription.add(this.state.ActiveStep.subscribe(step => {
            this.ActiveStep = step;
        }));
    }

    Next() {
        this.state.Next();
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }

    Finish() {
        this.FinishClicked = true;

        const body = this.state.State;

        this.authService.register(body).subscribe(() => {
            this.toastr.success('Registration success');
        }, error => {
            this.toastr.error(error);
        }, () => {
            this.authService.login(body).subscribe(() => {
                this.router.navigate(['/member/edit']);
            });
        });
    }

    Prev() {
        this.state.Previous();
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
