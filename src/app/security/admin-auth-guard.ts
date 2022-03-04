import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isAuthenticated = this.authService.isAdminLoggedIn();
    if (!isAuthenticated) {
      this.router.navigate(['/admin/login'], {
        queryParams: { returnUrl: state.url },
      });
    }
    return isAuthenticated;
  }
}
