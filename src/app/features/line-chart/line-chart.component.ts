import { Component, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';
import { ChartOptions } from './lineChartOptions';
import { ChartComponent } from 'ng-apexcharts';
import { WeatherDataService } from '../../core/weather-data-service/weather-data.service';
import { FilterDataService } from '../../core/filter-data-service/filter-data.service';
import { DateCity } from '../../shared/date-city/date-city';
import { WeatherDataItem } from '../../shared/weather-data-item/weather-data-item';

@Component({
  selector: 'app-root',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})

export class LineChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartOptions> | any;
  weatherData: WeatherDataItem[] = [];
  loading: boolean = false;
  error: any = '';
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private weatherDataService: WeatherDataService,
    private filterDataSerivce: FilterDataService,
  ) {
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
        toolbar: {
          show: false,
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
        align: 'right',
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

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  onInputChange(emitedData: DateCity) {
    if((emitedData.city) && (emitedData.date)){
      this.loading = true;
      this.weatherData = [];
      this.resetChartData();
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
          (res: WeatherDataItem[]) => {
            this.weatherData = this.filterDataSerivce.filterAndSortChartData(
              res,
              emitedData.date,
            );
          this.pushChartData();
          },
          (err) => {
            this.error = err;
          }
        );
    }
  }

  resetChartData() {
    this.chartOptions.series[0].data = [];
    this.chartOptions.xaxis.categories = [];
  }

  pushChartData() {
    this.weatherData.forEach((element) => {
      this.chartOptions.series[0].data.push(element.the_temp);
      this.chartOptions.xaxis.categories.push(element.created);
    });
  }

}
