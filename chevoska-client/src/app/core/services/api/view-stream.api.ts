import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, map } from 'rxjs/operators';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class ViewStreamsApi implements OnDestroy {
  stream!: any;
  rootPath!: any;

  constructor(private api: ApiService) {}

  findStreamByEnterLink(enterLink: any): Observable<any> {
    return this.api.get(`/streams/view/${enterLink}`).pipe(
      map(result => {
        this.rootPath = `/stream/${result.enterLink}`;
        this.stream = result;
      }),
      catchError((error: any) => of(console.log(error)))
    );
  }

  enterSystem(data: any, streamId: number) {
    return this.api.post(`/streams/view/enter/${streamId}`, data);
  }

  ngOnDestroy(): void {}
}
