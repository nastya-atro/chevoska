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
}
