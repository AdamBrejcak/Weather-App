import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherTableItem } from 'src/app/features/weather-table/weather-table-item/weather-table-item';
import { DateOperationsService } from '../date-operations-service/date-operations.service';
import { formatDate } from '@angular/common';
import { forkJoin, Observable } from 'rxjs';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';
import { map } from 'rxjs/operators';
import { LineChartItem } from 'src/app/features/line-chart/line-chart-item/line-chart-item';
import { AppUtilsService } from '../app-utils-service/app-utils.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(
    private http: HttpClient,
    private appUtilsService: AppUtilsService,
    private dateOperationsService: DateOperationsService
  ) {}

  private makeApiCallsArray(emitedData: UserInputs): Array<string> {
    let diffBetweenDates = this.dateOperationsService.diffBetweenDates(
      emitedData.dates.dateFrom,
      emitedData.dates.dateTo
    );
    let apiCalls: any[] = [];

    for (let index = 0; index < diffBetweenDates; index++) {
      let pickedDate = formatDate(
        this.dateOperationsService.addDaysToDate(emitedData.dates.dateFrom, index),
        'yyyy/MM/dd',
        'en-US'
      );
      let pickedCity = emitedData.city?.code;
      apiCalls.push(
        this.http.get<WeatherTableItem[]>(
          `https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/${pickedCity}/${pickedDate}/`
        )
      );
    }
    return apiCalls;
  }

  checkDataLength(data: any): Object | null {
    let mergedData = [].concat.apply([], data);
    if (mergedData.length < 1) {
      return { message: 'There are no records to display.' };
    }
    return null;
  }

  loadWeatherTableData(userInputs: UserInputs): Observable<Array<WeatherTableItem>> {
    return forkJoin(this.makeApiCallsArray(userInputs)).pipe(
      map((Output: any) => {
        let results: WeatherTableItem[] = [];
        let mergedData = [].concat.apply([], Output);
        mergedData.forEach((el: WeatherTableItem) => {
          results.push(new WeatherTableItem(el));
        });
        return results;
      })
    );
  }

  loadLineChartData(userInputs: UserInputs): Observable<Array<LineChartItem>> {
    return forkJoin(this.makeApiCallsArray(userInputs)).pipe(
      map((Output: any) => {
        let results: LineChartItem[] = [];

        Output.forEach((element: any) => {
          let minTemps: any[] = [];
          let maxTemps: any[] = [];
          let applicableDate: string = '';

          element.forEach((el: WeatherTableItem) => {
            maxTemps.push(Number(el.max_temp));
            minTemps.push(Number(el.min_temp));
            applicableDate = el.applicable_date;
          });

          results.push(
            new LineChartItem({
              max_temp: this.appUtilsService.calculateAverageValue(maxTemps),
              min_temp: this.appUtilsService.calculateAverageValue(minTemps),
              applicable_date: applicableDate,
            })
          );
        });
        return results;
      })
    );
  }
}
