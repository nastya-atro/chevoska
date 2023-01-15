import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { StreamsApi } from '../../core/services/api/streams.api';
import { ResponseListInterface } from '../../core/interfaces/payload-list.interface';
import { StreamsListResponse } from '../../core/models/stream.model';
import { QueryParams } from '../../core/interfaces/query-params.interfaces';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StreamsService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  getStreams(params: QueryParams): Observable<ResponseListInterface<StreamsListResponse>> {
    return this.streamsApi.getStreams(params);
  }

  removeStream(id: number): Observable<unknown> {
    return this.streamsApi.removeStream(id);
  }
}
