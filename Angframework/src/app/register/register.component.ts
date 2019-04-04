import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../services/auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertifyService} from '../services/alertify.service';
import {BsDatepickerConfig} from 'ngx-bootstrap';
import {User} from '../models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Output() cancelRegister = new EventEmitter();

    user: User;
    registerForm: FormGroup;
    bsConfig: Partial<BsDatepickerConfig>;

    constructor(private authService: AuthService,
                private router: Router,
                private alertify: AlertifyService,
                private fb: FormBuilder) {
    }

    ngOnInit() {
        this.bsConfig = {
            containerClass: 'theme-red'
        };
        this.createRegisterForm();
    }

    createRegisterForm() {
        this.registerForm = this.fb.group({
            gender: ['male'],
            username: ['', Validators.required],
            knownAs: ['', Validators.required],
            dateOfBirth: [null, Validators.required],
            city: ['', Validators.required],
            country: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
            confirmPassword: ['', Validators.required]
        }, {validator: this.passwordMatchValidator});
    }

    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
    }

    register() {
        if (this.registerForm.valid) {
            this.user = Object.assign({}, this.registerForm.value);
            this.authService.register(this.user).subscribe(() => {
                this.alertify.success('Registration success');
            }, error => {
                this.alertify.error(error);
            }, () => {
                this.authService.login(this.user).subscribe(() => {
                    this.router.navigate(['/member/edit']);
                });
            });
        }
    }

    cancel() {
        this.cancelRegister.emit(false);
    }

}
