import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { ApiService } from '../api.service';
import { ResponseError } from '../../models/response-error.model';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  SEGMENT = '/auth';
  constructor(private api: ApiService) {}

  private formatErrors = (error: ResponseError) => throwError(error); // see error interceptor
  private formatResponse = (response: { payload: unknown }) => response?.payload;

  login(username: string, password: string): Observable<any> {
    return this.api
      .post(`${this.SEGMENT}/login`, { username, password })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  logout(): Observable<any> {
    return this.api.get(`${this.SEGMENT}/logout`).pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  signup(user: any): Observable<unknown> {
    return this.api.post(`${this.SEGMENT}/signup`, user);
  }

  getUserInfo(token: string): Observable<{ email: string; phone: string }> {
    return this.api.get(`${this.SEGMENT}/activate-profile?token=${token}`);
  }

  enterPrivateSystem(enterData: any, key: string): Observable<any> {
    return this.api
      .post(`${this.SEGMENT}/signin`, { enterData, key })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  enterSystem(enterData: any): Observable<any> {
    return this.api
      .post(`${this.SEGMENT}/signin`, { enterData })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  activate(token: string) {
    return this.api
      .get(`${this.SEGMENT}/activate?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  developActivate(token: string) {
    return this.api
      .get(`${this.SEGMENT}/develop-activate?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  sendConfirmEmailToken(token: string) {
    return this.api
      .get(`${this.SEGMENT}/validate-email?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  sendPhoneCode(token: string) {
    return this.api
      .get(`${this.SEGMENT}/validate-phone?token=${token}`)
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  sendResetPasswordRequest(email: string) {
    return this.api
      .post(`${this.SEGMENT}/forgot`, { email })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  setNewPassword(token: string, password: string) {
    return this.api
      .post(`${this.SEGMENT}/recover`, { token, password })
      .pipe(map(this.formatResponse), catchError(this.formatErrors));
  }

  validateRecoveryToken(token: string): Observable<string> {
    return this.api.get(`${this.SEGMENT}/forgot/${token}`);
  }
}
