import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanDeactivate
} from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanDeactivate<CanComponentDeactivate> {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(routeSnapshot: ActivatedRouteSnapshot, stateSnapshot: RouterStateSnapshot) {
    let token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigate([''], { queryParams: { redirectTo: stateSnapshot.url } });
    return false;
  }

  canDeactivate(component: CanComponentDeactivate) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
