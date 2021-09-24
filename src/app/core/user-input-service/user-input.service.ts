import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { City } from 'src/app/shared/city/city';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  private citySource = new BehaviorSubject(this.getCurrentCityValue());
  private dateSource = new BehaviorSubject(this.getCurrentDateValue());
  public readonly currentCityValue = this.citySource.asObservable();
  public readonly currentDateValue = this.dateSource.asObservable();

  constructor() {}

  private getCurrentCityValue(): City|undefined {
    if (localStorage.getItem('selectedCity')) {
      if (localStorage.getItem('selectedCity') === 'undefined') {
        return undefined;
      }
      let result = JSON.parse(localStorage.getItem('selectedCity') || '{}');
      return result;
    }
    return undefined;
  }

  changeCurrentCityValue(newCity: City|undefined) {
    localStorage.setItem('selectedCity', JSON.stringify(newCity));
    this.citySource.next(newCity);
  }

  private getCurrentDateValue(): Date {
    if (sessionStorage.getItem('selectedDate')) {
      return new Date(parseInt(sessionStorage.getItem('selectedDate') || '{}'));
    }
    return new Date();
  }

  changeCurrentDateValue(newDate: Date) {
    sessionStorage.setItem('selectedDate',JSON.stringify(+new Date(newDate)));
  }

}
