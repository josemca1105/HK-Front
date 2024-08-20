import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegisterComponent } from './componentes/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './componentes/error404/error404.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: 'inicio',
        component: HomeComponent
      },
      {
        path: '404',
        component: Error404Component
      }
    ]
  },
  { path: '**', component: Error404Component }
];
