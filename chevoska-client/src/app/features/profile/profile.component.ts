import { Component } from '@angular/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  profile!: any;
  form: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
      Validators.pattern('^[+]*[-\\s\\./0-9]*$'),
    ]),
    email: new FormControl('', [Validators.required, Validators.maxLength(80)]),
    avatar: new FormControl(''),
  });
  constructor(private authService: AuthenticationService) {
    this.profile = this.authService.getCurrentUser();
    this.form.patchValue({
      firstName: this.profile.firstName || '',
      lastName: this.profile.lastName || '',
      phone: this.profile.phone || '',
      email: this.profile.email || '',
    });
  }
}
