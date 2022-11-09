import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized = this.authService.isAuthorized();

    if (isAuthorized) {
      return isAuthorized;
    } else {
      return this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
    }
  }
}
