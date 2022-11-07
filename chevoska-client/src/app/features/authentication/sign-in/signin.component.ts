import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {
  myForm: FormGroup;

  constructor(private service: AuthenticationService, private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(255),
        Validators.pattern('(?=^.{6,}$)(?=.*[A-Z])(?=.*[a-z]).*'),
      ]),
    });
  }

  submit(): void {
    if (this.myForm.valid) {
      this.service
        .login(this.myForm.value.username, this.myForm.value.password)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => this.afterLogin(),
          error: () => {},
        });
    } else {
    }
  }

  afterLogin(): void {
    this.service
      .findCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => this.router.navigate(['/streams']),
        error: () => this.service.logout(),
      });
  }
}
