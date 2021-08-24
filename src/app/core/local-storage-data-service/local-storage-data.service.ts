import { Injectable } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { LastResultsItem } from 'src/app/shared/last-results-item/last-results-item';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageDataService {

  constructor() {}

  getLocalStorageCity(): City {
    if (localStorage.getItem('selectedCity')) {
      return JSON.parse(localStorage.getItem('selectedCity') || '{}');
    }
    return { name: 'London', code: 44418 };
  }

  changeLocalStorageCity(choosenCity: City) {
      localStorage.setItem('selectedCity', JSON.stringify(choosenCity));
  }

  getLocalStorageResults(): Array<LastResultsItem> {
    if (localStorage.getItem('results')) {
      return JSON.parse(localStorage.getItem('results') || '{}');
    }
    return [];
  }

  changeLocalStorageResults(lastResults: Array<LastResultsItem>) {
    localStorage.setItem('results', JSON.stringify(lastResults));
  }

}
