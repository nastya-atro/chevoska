import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError, map, forkJoin } from 'rxjs';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';

@Injectable({ providedIn: 'root' })
export class ViewStreamAsResolverGuard implements CanActivate {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private viewStream: ViewStreamService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const enterKey = route.paramMap.get('key') || '';

    return forkJoin([this.viewStream.findStreamByEnterLink(enterKey), this.viewStream.findCurrentClient()]).pipe(
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
