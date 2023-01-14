import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamService } from '../../features/view-stream/viewStream.service';

@Injectable({ providedIn: 'root' })
export class ClientActiveSessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private viewStreamService: ViewStreamService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isClientSessionSave = this.viewStreamService.isClientSessionSave();
    const isClientSessionToCurrentStream =
      this.viewStreamService.getCurrentClient()?.stream === this.viewStreamService.stream?.id;

    if (isClientSessionSave && isClientSessionToCurrentStream) {
      return isClientSessionSave && isClientSessionToCurrentStream;
    } else {
      return this.router.navigate([`${this.viewStreamService.rootPath}`], { queryParams: { returnUrl: state.url } });
    }
  }
}
