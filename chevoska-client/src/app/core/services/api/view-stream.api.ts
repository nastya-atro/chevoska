import { Injectable, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class ViewStreamsApi implements OnDestroy {
  constructor(private api: ApiService) {}

  findStreamByEnterLink(enterLink: any): Observable<any> {
    return this.api.get(`/streams/view/${enterLink}`);
  }

  enterSystem(data: any) {
    return this.api.post(`/streams/view/enter`, data);
  }

  ngOnDestroy(): void {}
}
