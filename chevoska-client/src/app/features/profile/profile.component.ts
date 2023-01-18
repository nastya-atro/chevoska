import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../authentication/authentication.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import Utils from '../../core/utils/utils';
import { NotifyService } from '../../shared/modules/notifications/notify.service';
import { ActivatedRoute } from '@angular/router';
import { Profile, ProfileResolverData } from '../../core/models/user.model';
import { UserProfileFormGroup } from '../../core/interfaces/forms/profile-forms.interface';
import { transition, trigger, useAnimation } from '@angular/animations';
import { fadeIn } from 'ng-animate';
import { finalize } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(
        '* => *',
        useAnimation(fadeIn, {
          params: { timing: 0.4, delay: 0 },
        })
      ),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  profile!: Profile;
  form: UserProfileFormGroup;
  imagePreview!: string;
  loading = false;
  uploadedFile: File | null = null;

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
      username: new FormControl('', [Validators.required, Validators.maxLength(80)]),
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
      next: data => {
        const profileData = (data as ProfileResolverData)?.profileComponentData || null;
        if (profileData) {
          this.profile = profileData;
          this.form.patchValue({
            firstName: this.profile.firstName || '',
            lastName: this.profile.lastName || '',
            username: this.profile.username || '',
            phone: this.profile.phone || '',
            email: this.profile.email || '',
            avatar: this.profile.avatar || '',
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
            username: result.username || '',
            phone: result.phone || '',
            email: result.email || '',
          });
        },
        error: () => {},
      });
  }

  editProfile() {
    const data = { ...this.form.value, file: this.uploadedFile }; // get form data
    this.loading = true;

    if (this.form.valid) {
      this.profileService
        .editProfile(data)
        .pipe(
          untilDestroyed(this),
          finalize(() => (this.loading = false))
        )
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

  handleUpload(event: any) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | [] = element.files || [];
    let file = fileList[0];
    if (file) {
      this.uploadedFile = file;
      this.form.patchValue({
        avatar: '',
      });
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.imagePreview = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
