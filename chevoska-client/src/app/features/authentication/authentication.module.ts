import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_ROUTES } from './authentication.routes';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './sign-up/signup.component';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { SigninComponent } from './sign-in/signin.component';

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [SignupComponent, EnterSystemComponent, SigninComponent],
})
export class AuthenticationModule {}
