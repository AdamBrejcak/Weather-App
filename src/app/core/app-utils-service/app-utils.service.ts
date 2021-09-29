import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  constructor() {}

  calculateAverageValue(data: number[]): number {
    return Number((data.reduce((a, b) => a + b) / data.length).toFixed(2));
  }

  sortData(data: any, sortByPropertyName: string): any {
    data.sort((a: any, b: any) => {
      let dateA = a[sortByPropertyName];
      let dateB = b[sortByPropertyName];
      return dateA > dateB ? 1 : -1;
    });
    return data;
  }
}
