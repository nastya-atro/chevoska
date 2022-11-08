import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersApi implements OnDestroy {
  constructor(private api: ApiService) {}

  findCurrentUser(): Observable<any> {
    return this.api.get(`/auth/profile`);
  }

  ngOnDestroy(): void {}
}
