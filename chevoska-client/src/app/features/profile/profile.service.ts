import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ProfileApi } from '../../core/services/api/profile.api';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  constructor(private router: Router, private profileApi: ProfileApi) {}

  ngOnDestroy(): void {}

  findCurrentUser() {
    return this.profileApi.getCurrentUser();
  }

  editProfile(data: any) {
    return this.profileApi.editProfile(data);
  }
}
