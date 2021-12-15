import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { City } from 'src/app/shared/city/city';
import * as citiesData from '../../shared/cities.json';

@Injectable({
  providedIn: 'root',
})
export class CitiesService {
  originalCities: City[] = (citiesData as any).default;
  private citiesSource = new BehaviorSubject(this.initCitiesValues());
  private notesSource = new BehaviorSubject(this.initCitiesNotes());

  public readonly currentCities = this.citiesSource.asObservable();
  public readonly currentNotes = this.notesSource.asObservable();
  constructor() {}

  private initCitiesValues(): City[] {
    if (JSON.parse(localStorage.getItem('cities') || '{}').length > 1) {
      return JSON.parse(localStorage.getItem('cities') || '{}');
    }

    localStorage.setItem('cities', JSON.stringify(this.originalCities));
    return JSON.parse(localStorage.getItem('cities') || '{}');
  }

  changeCities(cities: City[]) {
    localStorage.setItem('cities', JSON.stringify(cities));
    this.citiesSource.next(cities);
  }

  deleteCity(cityCode: number) {
    let cities: any;
    this.currentCities.pipe(take(1)).subscribe((res: City[]) => {
      cities = res;
    });
    let cityIndex = cities.indexOf(cities.find((c: City) => c.code === cityCode));
    cities.splice(cityIndex, 1);
    this.changeCities(cities);
  }

  private initCitiesNotes(): string[] {
    if (Object.keys(JSON.parse(localStorage.getItem('citiesNotes') || '{}')).length > 0) {
      return JSON.parse(localStorage.getItem('citiesNotes') || '{}');
    }
    let localStorageCitiesNotes: any = {};
    for (let index = 0; index < this.originalCities.length; index++) {
      localStorageCitiesNotes[this.originalCities[index].code] = '';
    }

    localStorage.setItem('citiesNotes', JSON.stringify(localStorageCitiesNotes));
    return JSON.parse(localStorage.getItem('citiesNotes') || '{}');
  }

  getCityNote(cityCode: number): string {
    let localStorageCitiesNotes: any;
    this.currentNotes.pipe(take(1)).subscribe((res) => (localStorageCitiesNotes = res));
    return localStorageCitiesNotes[cityCode];
  }

  changeCityNote(cityCode: number, note: string): void {
    let cities: any;
    this.currentCities.pipe(take(1)).subscribe((res: City[]) => {
      cities = res;
    });
    let cityIndex = cities.indexOf(cities.find((c: City) => c.code === cityCode));
    let notes: any;
    this.currentNotes.pipe(take(1)).subscribe((res) => (notes = res));

    cities[cityIndex].note = note;
    notes[cityCode] = note;

    this.citiesSource.next(cities);
    this.notesSource.next(notes);

    localStorage.setItem('citiesNotes', JSON.stringify(notes));
  }
}
