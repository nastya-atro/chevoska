import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { CurrentUserResponse } from '../../models/user.model';
import { CurrentClientResponse } from '../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSessionApi implements OnDestroy {
  constructor(private api: ApiService) {}

  findCurrentUser(): Observable<CurrentUserResponse> {
    return this.api.get(`/auth/profile`);
  }

  findCurrentClient(): Observable<CurrentClientResponse> {
    return this.api.get(`/streams/client`);
  }

  ngOnDestroy(): void {}
}
