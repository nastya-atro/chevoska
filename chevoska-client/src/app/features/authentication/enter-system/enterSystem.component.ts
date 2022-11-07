import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
@UntilDestroy()
@Component({
  selector: 'app-enter-system',
  templateUrl: './enterSystem.component.html',
  styleUrls: ['./enterSystem.component.scss'],
})
export class EnterSystemComponent {
  myForm: FormGroup;

  constructor(private service: AuthenticationService, private router: Router) {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      key: new FormControl('', [Validators.required]),
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
