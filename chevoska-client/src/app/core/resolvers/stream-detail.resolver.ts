import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { MainPageService } from '../../features/main-page/main-page.service';

@Injectable({ providedIn: 'root' })
export class StreamDetailResolver implements Resolve<any> {
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private mainService: MainPageService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    const id = route.paramMap.get('id') || '';

    return this.mainService.getStreamDetail(Number(id)).pipe(
      catchError((error: Error) => {
        if (error.message === 'Object not found') this.router.navigate(['/404']);
        return throwError(() => new Error(error.message));
      })
    );
  }
}
