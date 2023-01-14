import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { CurrentSessionApi } from '../services/api/current-session.api';

@Injectable({ providedIn: 'root' })
export class DateCountResolver implements Resolve<any> {
  constructor(
    private currentSessionApi: CurrentSessionApi,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.currentSessionApi.findCurrentUser().pipe(
      catchError((error: Error) => {
        if (error.message === 'Object not found') this.router.navigate(['/404']);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
