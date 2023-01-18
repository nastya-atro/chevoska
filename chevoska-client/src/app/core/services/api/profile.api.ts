import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { EditProfileRequest, ProfileResponse } from '../../models/user.model';
import Utils from '../../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi implements OnDestroy {
  SEGMENT = '/profile';

  constructor(private api: ApiService) {}
  ngOnDestroy(): void {}

  editProfile(data: EditProfileRequest): Observable<unknown> {
    const formData = Utils.fromObjToFormData(data);

    return this.api.put(`${this.SEGMENT}`, formData);
  }

  getProfileInfo(): Observable<ProfileResponse> {
    return this.api.get(`${this.SEGMENT}`);
  }
}
