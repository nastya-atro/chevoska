import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { StreamService } from '../../features/stream/stream.service';

@Injectable({ providedIn: 'root' })
export class StreamResolver implements Resolve<any> {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private streamService: StreamService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id') || '';

    return this.streamService.getStream(Number(id)).pipe(
      catchError((error: Error) => {
        if (error.message === 'Object not found') this.router.navigate(['/404']);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
