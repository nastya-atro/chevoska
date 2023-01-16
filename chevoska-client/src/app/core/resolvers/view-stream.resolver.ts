import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, forkJoin, map, Observable, take, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectClient, selectViewStream } from '../../store/app.selectors';
import { CurrentClient } from '../models/client.model';
import { ViewStream } from '../models/view-stream.model';

@Injectable({ providedIn: 'root' })
export class ViewStreamResolver implements Resolve<any> {
  client$: Observable<CurrentClient | null> = this.store.select(selectClient);
  viewStream$: Observable<ViewStream | null> = this.store.select(selectViewStream);

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return forkJoin([this.viewStream$.pipe(take(1)), this.client$.pipe(take(1))]).pipe(
      map(result => {
        const viewStream = result[0] || null;
        const client = result[1] || null;
        return {
          viewStream,
          client,
        };
      }),
      catchError((error: Error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
}
