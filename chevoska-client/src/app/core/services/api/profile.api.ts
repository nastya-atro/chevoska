import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileApi implements OnDestroy {
  constructor(private api: ApiService) {}
  ngOnDestroy(): void {}

  editProfile(data: any): Observable<any> {
    return this.api.put(`/profile`, data);
  }

  getCurrentUser(): Observable<any> {
    return this.api.get(`/profile`);
  }
}
