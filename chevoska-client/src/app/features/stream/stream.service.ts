import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { StreamsApi } from '../../core/services/api/streams.api';
import {
  CreateStreamRequest,
  EditStreamRequest,
  StreamForUserResponse,
} from '../../core/models/streams/stream-for-user.model';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class StreamService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  createStream(formData: FormData): Observable<unknown> {
    return this.streamsApi.createStream(formData);
  }

  getStream(id: number): Observable<StreamForUserResponse> {
    return this.streamsApi.getStream(id);
  }

  generatePrivateKey(id: number): Observable<unknown> {
    return this.streamsApi.generatePrivateKey(id);
  }

  editStream(id: number, formData: FormData): Observable<unknown> {
    return this.streamsApi.editStream(id, formData);
  }
}
