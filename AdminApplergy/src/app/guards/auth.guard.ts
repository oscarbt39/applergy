import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable} from 'rxjs';
import { AuthService } from '../services/auth.service';


export const authGuard: CanActivateFn = (route, state) => {
  return true;
};

@Injectable({
  providedIn: "root"
})

export class AuthGuard implements CanActivate{
  constructor(private auth: AuthService, private router: Router) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
  Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLogged()) {
      return true
    } else {
      this.router.navigate(["/acceso"])
      return false
    }
  }
}
