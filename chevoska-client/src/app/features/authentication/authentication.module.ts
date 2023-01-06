import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AUTHENTICATION_ROUTES } from './authentication.routes';
import { SharedModule } from '../../shared/shared.module';
import { SignupComponent } from './sign-up/signup.component';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { SigninComponent } from './sign-in/signin.component';
import { ConfirmEmailComponent } from './activate-profile/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PreActivateComponent } from './activate-profile/pre-activate/pre-activate.component';
import { EndActivateComponent } from './activate-profile/end-activate/end-activate.component';

@NgModule({
  imports: [RouterModule.forChild(AUTHENTICATION_ROUTES), FormsModule, ReactiveFormsModule, CommonModule, SharedModule],
  declarations: [
    SignupComponent,
    EnterSystemComponent,
    SigninComponent,
    EndActivateComponent,
    ConfirmEmailComponent,
    ForgotPasswordComponent,
    PreActivateComponent,
  ],
})
export class AuthenticationModule {}
