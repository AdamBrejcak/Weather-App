import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { UserInputService } from '../user-input-service/user-input.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SelectedCityGuard implements CanActivate {

  constructor(private userInputService: UserInputService, private router: Router){}

  canActivate(): boolean|UrlTree{
    let currentCity;
    this.userInputService.currentCityValue.subscribe(res => currentCity = res);
    if (!currentCity) {
      return this.router.parseUrl('map');
    }
    return true;
  }

}
