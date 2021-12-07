import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';

@Injectable({
  providedIn: 'root',
})
export class RouterParamsService {

  constructor(private router: Router,) {}

  replaceRouteParams(inputsObject: UserInputs) {
    let actualRoute = this.router.url.split('/');

    this.router.navigate([
      `${actualRoute[1]}/${
        inputsObject.city?.code
      }/${inputsObject.dates.dateFrom.getTime()}/${inputsObject.dates.dateTo.getTime()}`]
    );
  }
}
