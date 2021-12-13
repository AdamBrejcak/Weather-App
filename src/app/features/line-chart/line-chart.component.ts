import { Component, OnInit, ViewChild } from '@angular/core';
import { merge, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ChartOptions } from './lineChartOptions';
import { ChartComponent } from 'ng-apexcharts';
import { WeatherDataService } from '../../core/weather-data-service/weather-data.service';
import { LineChartService } from './line-chart-service/line-chart.service';
import { LineChartItem } from './line-chart-item/line-chart-item';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions: Partial<ChartOptions> | any;
  loading: boolean = false;
  error: any = null;
  private cancelRequest: Subject<void> = new Subject<void>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private weatherDataService: WeatherDataService,
    private lineChartService: LineChartService,
    private appUtilsService: AppUtilsService,
    private ngxTranslateService: TranslateService
  ) {
    this.chartOptions = {
      series: [
        {
          name: '',
          data: [],
        },
        {
          name: '',
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

  ngOnInit() {
    this.changeChartSeriesNames();

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.changeChartSeriesNames();
      this.chart.updateSeries(this.chartOptions.series);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  changeChartSeriesNames() {
    this.chartOptions.series[1].name = this.ngxTranslateService.instant('LINE_CHART.AVG_MIN_TEMP');
    this.chartOptions.series[0].name = this.ngxTranslateService.instant('LINE_CHART.AVG_MAX_TEMP');
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
        finalize(() => this.loading = false)
      )
      .subscribe(
        (res: LineChartItem[]) => {
          let sortedResult = this.appUtilsService.sortDataByValue(res, 'applicableDate');
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
