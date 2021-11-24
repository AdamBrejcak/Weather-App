import { Injectable } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import * as citiesData from '../../shared/cities.json';

@Injectable({
  providedIn: 'root',
})
export class CitiesNotesService {
  cities: City[] = (citiesData as any).default;

  constructor() {}

  getCitiesNotes(): string[] {
    if (localStorage.getItem('citiesNotes')) {
      return JSON.parse(localStorage.getItem('citiesNotes') || '{}');
    }

    let localStorageCitiesNotes: any = {};
    for (let index = 0; index < this.cities.length; index++) {
      localStorageCitiesNotes[this.cities[index].code] = '';
    }

    localStorage.setItem('citiesNotes', JSON.stringify(localStorageCitiesNotes));
    return JSON.parse(localStorage.getItem('citiesNotes') || '{}');
  }

  getCityNote(cityCode: number): string {
    let localStorageCitiesNotes = this.getCitiesNotes();
    return localStorageCitiesNotes[cityCode];
  }

  changeCityNote(cityCode: number, note: string): void {
    let localStorageCitiesNotes = this.getCitiesNotes();
    localStorageCitiesNotes[cityCode] = note;
    localStorage.setItem('citiesNotes', JSON.stringify(localStorageCitiesNotes));
  }
}
