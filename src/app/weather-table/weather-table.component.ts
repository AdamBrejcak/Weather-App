import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../shared//weather-data.service';
import { formatDate } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
})
export class WeatherTableComponent implements OnInit {
  weatherData: Object[] = [];
  date: Date = new Date('2013/4/27');
  error: any = '';
  loading: boolean = false;
  componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit(): void {
    this.onDateChange();
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }
  onDateChange() {
    this.loading = true;
    this.weatherData = [];
    this.weatherDataService
      .getWeatherData(formatDate(this.date, 'yyyy/MM/dd', 'en-US'))
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(
        (res: any) => {
          this.weatherData = res;
        },
        (err) => {
          this.error = err;
        }
      );
  }
}
