import { Component, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MustMatch } from '../../../core/validators/must-match.validator';
@UntilDestroy()
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  myForm: FormGroup;

  constructor(private service: AuthenticationService, private router: Router, private formBuilder: FormBuilder) {
    this.myForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'
            ),
            Validators.maxLength(80),
          ],
        ],
        phone: ['', [Validators.required, Validators.pattern('^[+]*[-\\s\\./0-9]*$')]],
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
        isAgreement: [false],
      },
      { validator: MustMatch('password', 'confirmPassword') }
    );
  }

  submit(): void {
    if (this.myForm.valid) {
      if (!this.myForm.value.isAgreement) {
        // this.showError = true;
        // this.termsError = true;
        return;
      }
      this.service
        .signup({ ...this.myForm.value })
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.router.navigateByUrl('/confirm-email', { state: { email: this.myForm.value['email'] } });
          },
          error: () => {},
        });
    } else {
    }
  }

  ngOnDestroy(): void {
    this.myForm.reset();
  }
}