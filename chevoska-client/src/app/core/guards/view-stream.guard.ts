import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError, map, forkJoin } from 'rxjs';
import { ViewStreamsApi } from '../services/api/view-stream.api';
import { AuthenticationService } from '../../features/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class ViewStreamGuard implements CanActivate {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viewStream: ViewStreamsApi,
    private authService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const enterKey = route.paramMap.get('key') || '';
    console.log('_____yo');

    return forkJoin([this.viewStream.findStreamByEnterLink(enterKey), this.authService.findCurrentClient()]).pipe(
      map(result => {
        return {
          stream: result[0] || null,
          client: result[1] || null,
        };
      }),
      catchError((error: Error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
