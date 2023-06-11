import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ConnexionService } from '../connexion.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  authenticate!: boolean;

  constructor(private conService: ConnexionService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = this.conService.getToken();
    if (token) {
      this.authenticate = true;
      return true;
    } else {
      this.router.navigateByUrl('/login');
      this.authenticate = false;
      return false;
    }
  }

  getAuth() {
    return this.authenticate;
}
}