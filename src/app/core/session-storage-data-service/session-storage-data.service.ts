import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageDataService {

  constructor() {}

  getSessionStorageDate(): Date {
    if (sessionStorage.getItem('selectedDate')) {
      return new Date(parseInt(sessionStorage.getItem('selectedDate') || '{}'));
    }
    return new Date();
  }

  changeSessionStorageDate(choosenDate: Date) {
    sessionStorage.setItem(
      'selectedDate',
      JSON.stringify(+new Date(choosenDate)),
    );
  }

}
