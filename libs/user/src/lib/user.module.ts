import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { userRoutes } from './user.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationTwoFaceComponent } from './pages/authentication-two-face/authentication-two-face.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    RouterModule.forChild(userRoutes),
  ],
  declarations: [LoginComponent, AuthenticationTwoFaceComponent],
  providers: [],
})
export class LibsUserModule {}
