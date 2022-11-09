import { Routes } from '@angular/router';
import { SignupComponent } from './sign-up/signup.component';
import { EnterSystemComponent } from './enter-system/enterSystem.component';
import { SigninComponent } from './sign-in/signin.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { ConfirmationSignupComponent } from './confirmation/confirmation-signup.component';

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
    path: 'enter/:id',
    component: EnterSystemComponent,
  },
  {
    path: 'confirm-email',
    component: ConfirmEmailComponent,
  },
  {
    path: 'confirmation',
    component: ConfirmationSignupComponent,
  },
];
