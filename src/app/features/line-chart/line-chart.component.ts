import { Component, ViewChild } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ChartOptions } from './lineChartOptions';
import { ChartComponent } from 'ng-apexcharts';
import { WeatherDataService } from '../../core/weather-data-service/weather-data.service';
import { LineChartService } from './line-chart-service/line-chart.service';
import { LineChartItem } from './line-chart-item/line-chart-item';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartOptions> | any;
  loading: boolean = false;
  error: any = null;
  private cancelRequest: Subject<void> = new Subject<void>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private weatherDataService: WeatherDataService,
    private lineChartService: LineChartService,
    private appUtilsService: AppUtilsService
  ) {
    this.chartOptions = {
      series: [
        {
          name: 'Average Max Temperature',
          data: [],
        },
        {
          name: 'Average Min Temperature',
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

  onInputChange(emitedData: UserInputs) {
    if (!emitedData.city) {
      return;
    }
    this.cancelRequest.next();
    this.error = null;
    this.loading = true;

    this.weatherDataService
      .loadLineChartData(emitedData)
      .pipe(
        takeUntil(merge(this.componentDestroyed, this.cancelRequest)),
        finalize(() => (this.loading = false))
      )
      .subscribe(
        (res: LineChartItem[]) => {
          let sortedResult = this.appUtilsService.sortData(res, 'applicableDate');
          this.error = this.weatherDataService.checkDataLength(res);
          this.lineChartService.resetChartData(this.chartOptions);

          this.lineChartService.pushChartDataToChartOptions(sortedResult, this.chartOptions);
        },
        (err: any) => {
          this.error = err;
        }
      );
  }
}
