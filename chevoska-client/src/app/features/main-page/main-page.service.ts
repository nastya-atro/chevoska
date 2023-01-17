import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StreamsApi } from '../../core/services/api/streams.api';
import { QueryParams } from '../../core/interfaces/query-params.interfaces';
import { Observable } from 'rxjs';
import { ResponseListInterface } from '../../core/interfaces/payload-list.interface';
import {
  StreamForClientResponse,
  StreamsForClientListResponse,
} from '../../core/models/streams/stream-for-client.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class MainPageService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  getAllStreams(params: QueryParams): Observable<ResponseListInterface<StreamsForClientListResponse>> {
    return this.streamsApi.getAllStreams(params);
  }

  getStreamDetail(id: number): Observable<StreamForClientResponse> {
    return this.streamsApi.getStreamDetail(id);
  }
}
