import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import Utils from '../../core/utils/utils';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { ActivatedRoute } from '@angular/router';
import { Profile } from '../../core/models/user.model';
import { UserProfileFormGroup } from '../../core/interfaces/forms/profile-forms.interface';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  form: UserProfileFormGroup;
  constructor(
    private authService: AuthenticationService,
    private profileService: ProfileService,
    private notifyService: NotifyService,
    private activateRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(25),
        Validators.pattern('^[+]*[-\\s\\./0-9]*$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^(\\s+)?[a-zA-Z0-9+._-]+@[a-zA-Z0-9-]+[.]{1}[a-zA-Z]{2,4}([.]{1}[a-zA-Z]{2,4})?(\\s+)?$'),
        Validators.maxLength(80),
      ]),
      avatar: new FormControl(''),
    }) as UserProfileFormGroup;
  }

  ngOnInit() {
    this.activateRoute.data.pipe(untilDestroyed(this)).subscribe({
      next: ({ profileComponentData }) => {
        if (profileComponentData) {
          this.profile = profileComponentData;
          this.form.patchValue({
            firstName: this.profile.firstName || '',
            lastName: this.profile.lastName || '',
            phone: this.profile.phone || '',
            email: this.profile.email || '',
          });
        }
      },
    });
  }

  loadProfile() {
    this.profileService
      .getProfileInfo()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: result => {
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
