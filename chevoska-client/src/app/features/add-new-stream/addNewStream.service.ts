import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { StreamsApi } from '../../core/services/api/streams.api';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class AddNewStreamService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  createStream(stream: any): Observable<unknown> {
    return this.streamsApi.createStream(stream);
  }
}
