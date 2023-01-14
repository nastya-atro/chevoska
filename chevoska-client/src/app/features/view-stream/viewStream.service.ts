import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewStreamsApi } from '../../core/services/api/view-stream.api';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CurrentSessionApi } from '../../core/services/api/current-session.api';
import { CurrentClientResponse } from '../../core/models/client.model';
import { EnterViewStreamRequest, ViewStream, ViewStreamResponse } from '../../core/models/view-stream.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamService implements OnDestroy {
  private currentClient: CurrentClientResponse | null = null;
  stream!: ViewStream;
  rootPath!: string;

  constructor(private router: Router, private viewStreamApi: ViewStreamsApi, private usersApi: CurrentSessionApi) {}

  ngOnDestroy(): void {}

  enterSystem(data: EnterViewStreamRequest, streamId: number) {
    return this.viewStreamApi.enterSystem(data, streamId);
  }

  getCurrentClient(): CurrentClientResponse | null {
    return this.currentClient;
  }

  findStreamByEnterLink(enterLink: string): Observable<void | ViewStreamResponse> {
    return this.viewStreamApi.findStreamByEnterLink(enterLink).pipe(
      map(result => {
        this.rootPath = `/stream/${result.enterLink}`;
        this.stream = result;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  findCurrentClient(): Observable<void | CurrentClientResponse> {
    return this.usersApi.findCurrentClient().pipe(
      map(client => {
        this.currentClient = client;
        return client;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  isClientSessionSave(): boolean {
    return !!this.currentClient;
  }

  resetClient(): void {
    this.currentClient = null;
  }
}
