import { Component, ViewChild, OnInit } from '@angular/core';
import { WeatherDataService } from '../shared//weather-data.service';
import { formatDate } from '@angular/common';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
})
export class WeatherTableComponent implements OnInit {
  weatherData: Object[] = [];
  choosenDate: Date = new Date('2013/4/27');
  error: any = '';
  loading: boolean = false;
  cities: any[] = [
    { cname: 'London', code: 44418 },
    { cname: 'New York', code: 2459115 },
    { cname: 'Los Angeles', code: 2442047 },
    { cname: 'Toronto', code: 4118 },
    { cname: 'Paris', code: 615702 },
    { cname: 'San Francisco', code: 2487956 },
  ];
  selectedCity: any = { cname: 'London', code: 44418 };
  componentDestroyed: Subject<void> = new Subject<void>();
  @ViewChild('dt') dt: Table | undefined | any;
  constructor(private weatherDataService: WeatherDataService) {}

  ngOnInit(): void {
    if (localStorage.getItem('selectedCity')) {
      let tempData: any;
      tempData = localStorage.getItem('selectedCity');
      this.selectedCity = JSON.parse(tempData);
    }
    this.onInputChange();
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
    localStorage.setItem('selectedCity', JSON.stringify(this.selectedCity));
  }
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  onInputChange() {
    this.loading = true;
    this.weatherData = [];
    this.weatherDataService
      .getWeatherData(
        formatDate(this.choosenDate, 'yyyy/MM/dd', 'en-US'),
        this.selectedCity.code
      )
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
