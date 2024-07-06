import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationTwoFaceComponent } from './pages/authentication-two-face/authentication-two-face.component';

export const userRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'authentication',
    component: AuthenticationTwoFaceComponent,
  },
];
