import { Routes } from '@angular/router';
import { SignupComponent } from './sign-up/signup.component';
import { SigninComponent } from './sign-in/signin.component';
import { ConfirmEmailComponent } from './activate-profile/confirm-email/confirm-email.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PreActivateComponent } from './activate-profile/pre-activate/pre-activate.component';
import { EndActivateComponent } from './activate-profile/end-activate/end-activate.component';

export const AUTHENTICATION_ROUTES: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'pre-activate',
    component: PreActivateComponent,
  },
  {
    path: 'activating',
    component: EndActivateComponent,
  },
  {
    path: 'forgot',
    component: ForgotPasswordComponent,
  },
];
