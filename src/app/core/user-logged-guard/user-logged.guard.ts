import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class UserLoggedGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.authenticationService.userLogged.subscribe((res: any) => {
        if (res.loggedIn) {
          resolve(this.router.parseUrl('map'));
        }
        resolve(true);
      });
    });
  }
}
