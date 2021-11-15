import { LineChartComponent } from './line-chart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WeatherApiInputsModule } from '../weather-api-inputs/weather-api-inputs.module';
import { LineChartRoutingModule } from './line-chart-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LineChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    WeatherApiInputsModule,
    LineChartRoutingModule,
    TranslateModule,
  ],
})
export class LineChartModule {}
