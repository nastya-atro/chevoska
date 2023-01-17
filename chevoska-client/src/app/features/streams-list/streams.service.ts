import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { StreamsApi } from '../../core/services/api/streams.api';
import { ResponseListInterface } from '../../core/interfaces/payload-list.interface';
import { QueryParams } from '../../core/interfaces/query-params.interfaces';
import { StreamsForUserListResponse } from '../../core/models/streams/stream-for-user.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StreamsService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  getMyStreams(params: QueryParams): Observable<ResponseListInterface<StreamsForUserListResponse>> {
    return this.streamsApi.getMyStreams(params);
  }

  removeStream(id: number): Observable<unknown> {
    return this.streamsApi.removeStream(id);
  }
}
