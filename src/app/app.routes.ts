import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { UsersCreateComponent } from './admin/users-create/users-create.component';
import { UsersTableComponent } from './admin/users-table/users-table.component';
import { UsersEditComponent } from './admin/users-edit/users-edit.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { PerfilEditComponent } from './componentes/perfil-edit/perfil-edit.component';
import { CaptacionesComponent } from './componentes/captaciones/captaciones.component';
import { CaptacionesAdminTableComponent } from './admin/captaciones-admin-table/captaciones-admin-table.component';
import { CaptacionesAdminEditComponent } from './admin/captaciones-admin-edit/captaciones-admin-edit.component';
import { CaptacionesPersonalCreateComponent } from './componentes/captaciones-personal-create/captaciones-personal-create.component';
import { CaptacionesPersonalEditComponent } from './componentes/captaciones-personal-edit/captaciones-personal-edit.component';
import { PruebaComponent } from './pages/prueba/prueba.component';
import { NewPasswordRequestComponent } from './componentes/new-password-request/new-password-request.component';
import { NewPasswordCreateComponent } from './componentes/new-password-create/new-password-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'request-password',
    component: NewPasswordRequestComponent,
  },
  {
    path: 'create-new-password',
    component: NewPasswordCreateComponent,
  },

  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'inicio',
        component: HomeComponent,
      },
      {
        path: 'perfil',
        component: PerfilComponent,
      },
      {
        path: 'perfil-edit/:id',
        component: PerfilEditComponent,
      },
      {
        path: 'users-create',
        component: UsersCreateComponent,
      },
      {
        path: 'users-table',
        component: UsersTableComponent,
      },
      {
        path: 'users-edit/:id',
        component: UsersEditComponent,
      },
      {
        path: 'captaciones',
        component: CaptacionesComponent,
      },
      {
        path: 'captaciones-admin-table',
        component: CaptacionesAdminTableComponent,
      },
      {
        path: 'captaciones-admin-edit/:id',
        component: CaptacionesAdminEditComponent,
      },
      {
        path: 'captaciones-create',
        component: CaptacionesPersonalCreateComponent,
      },
      {
        path: 'captaciones-edit/:id',
        component: CaptacionesPersonalEditComponent,
      },
      {
        path: 'prueba',
        component: PruebaComponent,
      },
    ],
  },
  {
    path: '404',
    component: Error404Component,
  },
  { path: '**', component: Error404Component },
];
