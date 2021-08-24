import { Injectable } from '@angular/core';
import { WeatherDataItem } from 'src/app/shared/weather-data-item/weather-data-item';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FilterDataService {

  constructor() {}

  filterAndSortChartData(results: WeatherDataItem[], choosenDate: Date): Array<WeatherDataItem> {
    let formatedData: WeatherDataItem[] = [];
    formatedData = results.filter(result => result.the_temp &&
      formatDate(choosenDate, 'yyyy-MM-dd', 'en-US') === result.applicable_date);
    formatedData.sort((a: WeatherDataItem, b: WeatherDataItem) => a.created.localeCompare(b.created));
    return formatedData;
  }

}
