import { Injectable } from '@angular/core';
import { LineChartItem } from '../line-chart-item/line-chart-item';
import { ChartOptions } from '../lineChartOptions';

@Injectable({
  providedIn: 'root',
})
export class LineChartService {
  constructor() {}

  resetChartData(chartOptions: ChartOptions) {
    chartOptions.series[1].data = [];
    chartOptions.series[0].data = [];
    chartOptions.xaxis.categories = [];
  }

  pushChartDataToChartOptions(data: LineChartItem[], chartOptions: ChartOptions) {
    data.forEach((element: any) => {
      chartOptions.series[1].data.push(element.minTemp);
      chartOptions.series[0].data.push(element.maxTemp);
      chartOptions.xaxis.categories.push(element.applicableDate);
    });
  }
}
