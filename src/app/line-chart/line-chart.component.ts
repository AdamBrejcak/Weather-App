import { Component, ViewChild, OnInit } from '@angular/core';
import { WeatherDataService } from '../shared/weather-data.service';
import { formatDate } from '@angular/common';

import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { chartData } from '../lineChartData';
import { ChartOptions } from '../lineChartOptions';

import { ChartComponent } from 'ng-apexcharts';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  date: Date = new Date('2013/4/27');
  weatherData: chartData[] = [];
  loading: boolean = false;
  error: any = '';
  componentDestroyed: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.onDateChange();
  }
  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }
  onDateChange() {
    this.loading = true;
    this.weatherData = [];
    this.resetChartData();
    this.weatherDataService
      .getWeatherData(formatDate(this.date, 'yyyy/MM/dd', 'en-US'))
      .pipe(
        finalize(() => (this.loading = false)),
        takeUntil(this.componentDestroyed)
      )
      .subscribe(
        (res: any) => {
          this.weatherData = this.formatChartData(res);
          this.pushChartData();
        },
        (err) => {
          this.error = err;
        }
      );
  }

  resetChartData() {
    this.chartOptions.series[0].data = [];
    this.chartOptions.xaxis.categories = [];
  }
  pushChartData() {
    this.weatherData.forEach((element: chartData) => {
      this.chartOptions.series[0].data.push(element.the_temp.toFixed(2));
      this.chartOptions.xaxis.categories.push(element.created.slice(11, 19));
    });
  }
  formatChartData(res: any) {
    let formatedData: any = [];
    res.forEach((element: chartData) => {
      if (
        element.the_temp &&
        formatDate(this.date, 'yyyy/MM/dd', 'en-US').split('/').join('-') ===
          element.applicable_date
      ) {
        formatedData.push(element);
      }
      formatedData = _.sortBy(formatedData, 'created', 'desc');
    });
    return formatedData;
  }

  // chart from library
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  constructor(private weatherDataService: WeatherDataService) {
    this.chartOptions = {
      series: [
        {
          name: 'Temperature',
          data: [],
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: '',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5,
        },
      },
      xaxis: {
        categories: [],
      },
    };
  }
}
