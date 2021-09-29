import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { UserInputService } from '../user-input-service/user-input.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SelectedCityGuard implements CanActivate {
  constructor(private userInputService: UserInputService, private router: Router) {}

  canActivate(): Promise<boolean | UrlTree> {
    return new Promise((resolve) => {
      this.userInputService.currentCityValue.subscribe((res: any) => {
        if (!res) {
          resolve(this.router.parseUrl('map'));
        }
        resolve(true);
      });
    });
  }
}
