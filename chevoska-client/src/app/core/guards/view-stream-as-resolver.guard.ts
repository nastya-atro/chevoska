import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError, map, forkJoin } from 'rxjs';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';

@Injectable({ providedIn: 'root' })
export class ViewStreamAsResolverGuard implements CanActivate {
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private viewStream: ViewStreamService,
    private store: Store<AppState>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const enterKey = route.paramMap.get('key') || '';

    return forkJoin([this.viewStream.findStreamByEnterLink(enterKey), this.viewStream.findCurrentClient()]).pipe(
      map(result => {
        const viewStream = result[0] || null;
        const client = result[1] || null;
        return {
          stream: viewStream,
          client: client,
        };
      }),
      catchError((error: Error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
