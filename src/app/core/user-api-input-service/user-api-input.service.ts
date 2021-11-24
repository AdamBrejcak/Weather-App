import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from 'src/app/shared/city/city';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';

@Injectable({
  providedIn: 'root',
})
export class UserApiInputService {
  private citySource = new BehaviorSubject(this.initCityValue());
  private dateFromSource = new BehaviorSubject(this.initDateFromValue());
  private dateToSource = new BehaviorSubject(this.initDateToValue());

  public readonly currentCityValue = this.citySource.asObservable();
  public readonly currentDateFromValue = this.dateFromSource.asObservable();
  public readonly currentDateToValue = this.dateToSource.asObservable();

  constructor() {}

  changeCurrentInputsValues(inputsObject: UserInputs) {
    this.changeCurrentCityValue(inputsObject.city);
    this.changeCurrentDateFromValue(inputsObject.dates.dateFrom);
    this.changeCurrentDateToValue(inputsObject.dates.dateTo);
  }

  private initCityValue(): City | undefined {
    if (localStorage.getItem('selectedCity')) {
      if (localStorage.getItem('selectedCity') === 'undefined') {
        return undefined;
      }
      let result = JSON.parse(localStorage.getItem('selectedCity') || '{}');
      return result;
    }
    return undefined;
  }

  changeCurrentCityValue(newCity: City | undefined) {
    localStorage.setItem('selectedCity', JSON.stringify(newCity));
    this.citySource.next(newCity);
  }

  private initDateFromValue(): Date {
    if (sessionStorage.getItem('selectedDateFrom')) {
      return new Date(parseInt(sessionStorage.getItem('selectedDateFrom') || '{}'));
    }
    let actualDateMidnight = new Date().setHours(0, 0, 0, 0);
    sessionStorage.setItem('selectedDateFrom', JSON.stringify(+new Date(actualDateMidnight)));
    return new Date(actualDateMidnight);
  }

  changeCurrentDateFromValue(newDateFrom: Date) {
    sessionStorage.setItem('selectedDateFrom', JSON.stringify(+new Date(newDateFrom)));
    this.dateFromSource.next(newDateFrom);
  }

  private initDateToValue(): Date {
    if (sessionStorage.getItem('selectedDateTo')) {
      return new Date(parseInt(sessionStorage.getItem('selectedDateTo') || '{}'));
    }
    let actualDateMidnight = new Date().setHours(0, 0, 0, 0);
    sessionStorage.setItem('selectedDateTo', JSON.stringify(+new Date(actualDateMidnight)));
    return new Date(actualDateMidnight);
  }

  changeCurrentDateToValue(newDateTo: Date) {
    sessionStorage.setItem('selectedDateTo', JSON.stringify(+new Date(newDateTo)));
    this.dateToSource.next(newDateTo);
  }
}
