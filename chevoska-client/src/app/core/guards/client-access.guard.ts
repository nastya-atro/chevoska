import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientAccessGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private viewStreamService: ViewStreamService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.viewStreamService.isClientSessionToCurrentStreamActive().pipe(
      map(isActive => {
        if (isActive) {
          this.router.navigate([`${this.viewStreamService.rootViewStreamPath}/active`]);
        }
        return !isActive;
      })
    );
  }
}
