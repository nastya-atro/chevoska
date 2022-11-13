import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { PasswordRecoveredSteps } from './forgot-password.constants';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MustMatch } from '../../../core/validators/must-match.validator';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import Utils from '../../../core/utils/utils';

@UntilDestroy()
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  token!: string;
  step!: string;
  visibleEmail!: string;
  httpError!: string;
  email = new FormControl('');

  recoveryForm = this.formBuilder.group(
    {
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).*'),
          Validators.minLength(6),
          Validators.maxLength(255),
        ],
      ],
      confirmPassword: ['', [Validators.required, Validators.maxLength(255)]],
    },
    { validator: MustMatch('password', 'confirmPassword') }
  );
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthenticationService) {}

  ngOnInit(): void {
    if (this.router.parseUrl(this.router.url).queryParams['token']) {
      this.token = this.router.parseUrl(this.router.url).queryParams['token'];
      this.authService.validateRecoveryToken(this.token).subscribe({
        next: result => {
          this.visibleEmail = result;
          this.step = PasswordRecoveredSteps.CHANGE_PASSWORD_STEP;
        },
        error: (error: any) => {
          this.httpError = error.message;
          this.step = PasswordRecoveredSteps.ERROR_RECOVER;
        },
      });
    } else {
      this.step = PasswordRecoveredSteps.SEND_EMAIL_STEP;
    }
  }

  submitEmailForRecoveryPassword() {
    if (this.email.valid) {
      this.authService
        .sendResetPasswordRequest(this.email.value)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.visibleEmail = this.email.value;
            this.email.reset();
            this.step = PasswordRecoveredSteps.RESET_PASSWORD_STEP;
          },
          error: error => {
            this.httpError = error.error.message;
          },
        });
    } else {
      this.email.markAsTouched({ onlySelf: true });
    }
  }

  submitNewPassword(): void {
    if (this.recoveryForm.valid) {
      this.authService
        .setNewPassword(this.token, this.recoveryForm.value['password'])
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.step = PasswordRecoveredSteps.SUCCESS_RECOVER;
            this.recoveryForm.reset();
          },
          error: (error: any) => {
            this.httpError = error.message;
            this.step = PasswordRecoveredSteps.ERROR_RECOVER;
          },
        });
    } else {
      Utils.checkFormValidation(this.recoveryForm);
    }
  }
}
