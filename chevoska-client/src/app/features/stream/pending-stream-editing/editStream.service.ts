import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { StreamsApi } from '../../../core/services/api/streams.api';
import { Observable } from 'rxjs';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class EditStreamService implements OnDestroy {
  constructor(private router: Router, private streamsApi: StreamsApi) {}

  ngOnDestroy(): void {}

  getStream(id: number): Observable<unknown> {
    return this.streamsApi.getStream(id);
  }

  generatePrivateKey(id: number): Observable<unknown> {
    return this.streamsApi.generatePrivateKey(id);
  }

  editStream(id: number, newStreamData: any): Observable<unknown> {
    return this.streamsApi.editStream(id, newStreamData);
  }
}
