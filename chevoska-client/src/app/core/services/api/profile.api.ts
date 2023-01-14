import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { EditProfileRequest, ProfileResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi implements OnDestroy {
  constructor(private api: ApiService) {}
  ngOnDestroy(): void {}

  editProfile(data: EditProfileRequest): Observable<unknown> {
    return this.api.put(`/profile`, data);
  }

  getProfileInfo(): Observable<ProfileResponse> {
    return this.api.get(`/profile`);
  }
}
