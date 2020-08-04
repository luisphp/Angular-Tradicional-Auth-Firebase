import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {

  }
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  canActivate( ): boolean {
    console.log('Guard!, Identificate', this.auth.estaAutenticado());
    // return this.auth.estaAutenticado();
    if (this.auth.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
