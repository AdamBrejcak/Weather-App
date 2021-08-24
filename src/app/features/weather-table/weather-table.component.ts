import { Component, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { WeatherDataItem } from '../../shared/weather-data-item/weather-data-item';
import { WeatherDataService } from '../../core/weather-data-service/weather-data.service';
import { DateCity } from 'src/app/shared/date-city/date-city';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
})

export class WeatherTableComponent {
  @ViewChild('dt') dt: Table | undefined | any;
  weatherData: WeatherDataItem[] = [];
  error: any = '';
  loading: boolean = false;
  filterFields: string[] = [
    'created',
    'weather_state_name',
    'wind_direction_compass',
    'the_temp',
    'wind_speed',
    'humidity',
  ];
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor( private weatherDataService: WeatherDataService ) {}

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onInputChange(emitedData: DateCity) {
    if((emitedData.city) && (emitedData.date)){
      this.loading = true;
      this.weatherData = [];
      this.weatherDataService
        .getWeatherData(
          formatDate(emitedData.date, 'yyyy/MM/dd', 'en-US'),
          emitedData.city.code,
        )
        .pipe(
          finalize(() => (this.loading = false)),
          takeUntil(this.componentDestroyed),
        )
        .subscribe(
          (res: WeatherDataItem[]) => { this.weatherData = res; },
          (err) => { this.error = err; },
        );
    }
  }

}
