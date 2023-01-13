import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamsApi } from '../services/api/view-stream.api';

@Injectable({ providedIn: 'root' })
export class ClientActiveSessionGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private activatedRoute: ActivatedRoute,
    private viewStream: ViewStreamsApi
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isClientSessionSave = this.authService.isClientSessionSave();
    const isClientSessionToCurrentStream = this.authService.getCurrentClient()?.stream === this.viewStream.stream?.id;

    if (isClientSessionSave && isClientSessionToCurrentStream) {
      return isClientSessionSave && isClientSessionToCurrentStream;
    } else {
      return this.router.navigate([`${this.viewStream.rootPath}`], { queryParams: { returnUrl: state.url } });
    }
  }
}
