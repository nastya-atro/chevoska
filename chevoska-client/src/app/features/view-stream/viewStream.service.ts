import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamsApi } from '../../core/services/api/view-stream.api';
import { forkJoin, Observable, of, take } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentSessionApi } from '../../core/services/api/current-session.api';
import { CurrentClient, CurrentClientResponse } from '../../core/models/client.model';
import { EnterViewStreamRequest, ViewStream, ViewStreamResponse } from '../../core/models/view-stream.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectClient, selectViewStream } from '../../store/app.selectors';
import * as appActions from '../../store/app.actions';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamService implements OnDestroy {
  public rootViewStreamPath!: string;
  client$: Observable<CurrentClient | null> = this.store.select(selectClient);
  viewStream$: Observable<ViewStream | null> = this.store.select(selectViewStream);

  constructor(
    private router: Router,
    private viewStreamApi: ViewStreamsApi,
    private usersApi: CurrentSessionApi,
    private store: Store<AppState>
  ) {}

  ngOnDestroy(): void {}

  enterSystem(data: EnterViewStreamRequest, streamId: number): Observable<unknown> {
    return this.viewStreamApi.enterSystem(data, streamId);
  }

  findStreamByEnterLink(enterLink: string): Observable<void | ViewStreamResponse> {
    return this.viewStreamApi.findStreamByEnterLink(enterLink).pipe(
      map(viewStream => {
        this.rootViewStreamPath = `/stream/${viewStream.enterLink}`;
        this.store.dispatch(appActions.findViewStreamSuccess({ viewStream }));
        return viewStream || null;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  findCurrentClient(): Observable<void | CurrentClientResponse> {
    return this.usersApi.findCurrentClient().pipe(
      map(client => {
        this.store.dispatch(appActions.findClientViewStreamSuccess({ client }));
        return client || null;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  isClientSessionToCurrentStreamActive(): Observable<boolean> {
    return forkJoin([this.viewStream$.pipe(take(1)), this.client$.pipe(take(1))]).pipe(
      map(result => {
        const viewStream = result[0] || null;
        const client = result[1] || null;
        return client?.stream === viewStream?.id;
      })
    );
  }
}
