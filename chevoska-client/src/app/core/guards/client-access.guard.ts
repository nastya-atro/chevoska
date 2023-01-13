import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../features/authentication/authentication.service';
import { ViewStreamsApi } from '../services/api/view-stream.api';

@Injectable({ providedIn: 'root' })
export class ClientAccessGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthenticationService, private viewStream: ViewStreamsApi) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isClientSessionSave = this.authService.isClientSessionSave();
    const isClientSessionToCurrentStream = this.authService.getCurrentClient()?.stream === this.viewStream.stream?.id;
    if (isClientSessionSave && isClientSessionToCurrentStream) {
      return this.router.navigate([`${this.viewStream.rootPath}/active`]);
    } else {
      return !(isClientSessionSave && isClientSessionToCurrentStream);
    }
  }
}
