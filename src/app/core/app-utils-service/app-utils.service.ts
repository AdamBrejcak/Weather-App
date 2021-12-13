import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppUtilsService {
  constructor() {}

  calculateAverageValue(data: number[]): number {
    return Number((data.reduce((a, b) => a + b) / data.length).toFixed(2));
  }

  sortDataByValue(data: any[], propertyName: string): any[] {
    return data.sort((a, b) => a[propertyName] - b[propertyName]);
  }
}
