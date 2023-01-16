import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClientActiveSessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private viewStreamService: ViewStreamService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.viewStreamService.isClientSessionToCurrentStreamActive().pipe(
      map(isActive => {
        if (!isActive) {
          this.router.navigate([`${this.viewStreamService.rootViewStreamPath}`], {
            queryParams: { returnUrl: state.url },
          });
        }
        return isActive;
      })
    );
  }
}
