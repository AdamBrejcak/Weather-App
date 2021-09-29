import { formatDate } from '@angular/common';

export class LineChartItem {
  maxTemp: number;
  minTemp: number;
  applicableDate: string;

  constructor(data: any) {
    this.maxTemp = data.max_temp.toFixed(2);
    this.minTemp = data.min_temp.toFixed(2);
    this.applicableDate = formatDate(data.applicable_date, 'yyyy/MM/dd', 'en-US');
  }
}
