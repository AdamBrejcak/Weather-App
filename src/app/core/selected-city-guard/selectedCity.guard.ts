import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { UserApiInputService } from '../user-api-input-service/user-api-input.service';

@Injectable({
  providedIn: 'root',
})
export class SelectedCityGuard implements CanActivate {
  constructor(private userApiInputService: UserApiInputService, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.userApiInputService.currentCityValue.subscribe((res: any) => {
        if (!res) {
          resolve(this.router.parseUrl('map'));
        }
        resolve(true);
      });
    });
  }
}
