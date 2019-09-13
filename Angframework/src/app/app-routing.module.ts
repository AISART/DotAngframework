import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {PortalGuard} from './guards/portal.guard';
import {AdminGuard} from './guards/admin.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: './modules/portal/portal.module#PortalModule',
        canActivate: [PortalGuard]
    },
    {
        path: 'authentication',
        loadChildren: './modules/authentication/authentication.module#AuthenticationModule',
        canActivate: [AuthGuard],
    },
    {
        path: 'admin',
        loadChildren: './modules/admin/admin.module#AdminModule',
        canActivate: [AdminGuard],
        data: {
            expectedRole: ['Admin', 'Moderator']
        },
    },
    {path: '**', redirectTo: '/authentication'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
