import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../services/auth.service';

@Directive({
    selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
    @Input() appHasRole: string[];
    isVisibile = false;

    constructor(private viewContainerRef: ViewContainerRef,
                private templateRef: TemplateRef<any>,
                private authService: AuthService) {
    }

    ngOnInit() {
        const userRoles = this.authService.decodedToken.role as Array<string>;
        // if no roles clear the viewContainerRef
        if (!userRoles) {
            this.viewContainerRef.clear();
        }

        // if user role need then render the element
        if (this.authService.roleMatch(this.appHasRole)) {
            if (!this.isVisibile) {
                this.isVisibile = true;
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            } else {
                this.isVisibile = false;
                this.viewContainerRef.clear();
            }
        }
    }

}
