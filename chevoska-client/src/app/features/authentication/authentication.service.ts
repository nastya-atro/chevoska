import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, of } from 'rxjs';
import { CurrentSessionApi } from '../../core/services/api/current-session.api';
import { catchError, map } from 'rxjs/operators';
import { AuthApi } from '../../core/services/api/auth.api';
import { CreateUserRequest, CurrentUserResponse } from '../../core/models/user.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService implements OnDestroy {
  private currentUser: CurrentUserResponse | null = null;

  constructor(private router: Router, private authApi: AuthApi, private usersApi: CurrentSessionApi) {}

  ngOnDestroy(): void {}

  activateProfile(token: string) {
    return this.authApi.activate(token);
  }

  developActivateProfile(token: string) {
    return this.authApi.developActivate(token);
  }

  sendConfirmEmailToken(token: string) {
    return this.authApi.sendConfirmEmailToken(token);
  }

  sendPhoneCode(token: string) {
    return this.authApi.sendPhoneCode(token);
  }

  login(username: string, password: string): Observable<unknown> {
    return this.authApi.login(username, password);
  }

  signup(user: CreateUserRequest): Observable<unknown> {
    return this.authApi.signup(user);
  }

  getUserInfo(token: string): Observable<{ email: string; phone: string }> {
    return this.authApi.getUserInfo(token);
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

  findCurrentUser(): Observable<void | CurrentUserResponse> {
    return this.usersApi.findCurrentUser().pipe(
      map(user => {
        this.currentUser = user;
        return user;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  getCurrentUser(): any {
    return this.currentUser;
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

  sendResetPasswordRequest(email: string) {
    return this.authApi.sendResetPasswordRequest(email);
  }

  setNewPassword(token: string, password: string) {
    return this.authApi.setNewPassword(token, password);
  }

  validateRecoveryToken(token: string): Observable<string> {
    return this.authApi.validateRecoveryToken(token);
  }
}
