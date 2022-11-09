import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { UsersApi } from '../../core/services/api/users.api';
import { catchError, map } from 'rxjs/operators';
import { AuthApi } from '../../core/services/api/auth.api';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  private currentUser: any | null = null;

  constructor(private router: Router, private authApi: AuthApi, private usersApi: UsersApi) {}

  ngOnDestroy(): void {}

  activateProfile(token: string) {
    return this.authApi.activate(token);
  }

  login(username: string, password: string): Observable<unknown> {
    return this.authApi.login(username, password);
  }

  signup(user: any): Observable<unknown> {
    return this.authApi.signup(user);
  }

  enterSystem(enterData: any): Observable<unknown> {
    return this.authApi.enterSystem(enterData);
  }

  enterPrivateSystem(enterData: any, key: string): Observable<unknown> {
    return this.authApi.enterPrivateSystem(enterData, key);
  }

  logout() {
    return this.authApi
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          this.resetUser();
          this.router.navigate(['/signin']);
        },
        error: () => {
          this.resetUser();
          this.router.navigate(['/signin']);
        },
      });
  }

  findCurrentUser(): Observable<void | any> {
    return this.usersApi.findCurrentUser().pipe(
      map(user => {
        this.currentUser = user;
        return user;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  isAuthorized(): boolean {
    return !!this.currentUser;
  }

  initializer() {
    return this.findCurrentUser();
  }

  resetUser(): void {
    this.currentUser = null;
  }
}
