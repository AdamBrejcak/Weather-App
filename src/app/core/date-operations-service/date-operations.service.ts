import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateOperationsService {
  constructor() {}

  removeTimeFromDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  }

  addDaysToDate(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  removeDaysFromDate(date: Date, days: number): Date {
    var result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }

  /*
   * Calculate difference in days between two dates.
   */
  diffBetweenDates(dateFrom: Date, dateTo: Date): number {
    return Math.ceil(
      (this.removeTimeFromDate(dateTo).getTime() - this.removeTimeFromDate(dateFrom).getTime()) / (1000 * 3600 * 24) + 1
    );
  }
}
