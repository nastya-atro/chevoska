import { Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import Utils from '../../core/utils/utils';
import { NotifyService } from '../../shared/modules/notifications/notify.service';

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
  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notifyService: NotifyService
  ) {
    this.loadProfile();
  }

  loadProfile() {
    this.profileService
      .findCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (result: any) => {
          this.profile = result;
          this.form.patchValue({
            firstName: result.firstName || '',
            lastName: result.lastName || '',
            phone: result.phone || '',
            email: result.email || '',
          });
        },
        error: () => {},
      });
  }

  editProfile() {
    if (this.form.valid) {
      const data = { ...this.form.value };
      this.profileService
        .editProfile(data)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.loadProfile();
            this.notifyService.notifier.success('Profile edit success');
          },
          error: () => {},
        });
    } else {
      Utils.checkFormValidation(this.form);
    }
  }
}
