import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsersTableComponent } from './admin/users-table/users-table.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PerfilEditComponent } from './componentes/perfil-edit/perfil-edit.component';
import { CaptacionesComponent } from './componentes/captaciones/captaciones.component';
import { CaptacionesAdminTableComponent } from './admin/captaciones-admin-table/captaciones-admin-table.component';
import { CaptacionesAdminEditComponent } from './admin/captaciones-admin-edit/captaciones-admin-edit.component';
import { CaptacionesPersonalCreateComponent } from './componentes/captaciones-personal-create/captaciones-personal-create.component';
import { CaptacionesPersonalEditComponent } from './componentes/captaciones-personal-edit/captaciones-personal-edit.component';
import { NewPasswordRequestComponent } from './componentes/new-password-request/new-password-request.component';
import { NewPasswordCreateComponent } from './componentes/new-password-create/new-password-create.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  {
    path: 'reestablecer-clave',
    component: NewPasswordRequestComponent,
  },
  {
    path: 'reestablecer-clave/:uidb64/:token',
    component: NewPasswordCreateComponent,
  },

  {
    path: '',
    component: NavbarComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
        canActivate: [authGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [authGuard],
      },
      {
        path: 'perfil-edit/:id',
        component: PerfilEditComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin/users/table',
        component: UsersTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'captaciones',
        component: CaptacionesComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin/captaciones/table',
        component: CaptacionesAdminTableComponent,
        canActivate: [authGuard],
      },
      {
        path: 'admin/captaciones/edit/:id',
        component: CaptacionesAdminEditComponent,
        canActivate: [authGuard],
      },
      {
        path: 'captaciones/create',
        component: CaptacionesPersonalCreateComponent,
        canActivate: [authGuard],
      },
      {
        path: 'captaciones/edit/:id',
        component: CaptacionesPersonalEditComponent,
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '404',
    component: Error404Component,
  },
  { path: '**', component: Error404Component },
];
