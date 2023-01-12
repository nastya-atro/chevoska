import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamsApi implements OnDestroy {
  stream!: any;
  rootPath!: any;

  constructor(private api: ApiService) {}

  findStreamByEnterLink(enterLink: any): Observable<any> {
    this.api
      .get(`/streams/view/${enterLink}`)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: result => {
          this.rootPath = `/stream/${result.enterLink}`;
          this.stream = result;
        },
      });
    return this.api.get(`/streams/view/${enterLink}`);
  }

  enterSystem(data: any, streamId: number) {
    return this.api.post(`/streams/view/enter/${streamId}`, data);
  }

  findCurrentClient(id: number) {
    return this.api.get(`/streams/view/client/${id}`);
  }

  ngOnDestroy(): void {}
}
