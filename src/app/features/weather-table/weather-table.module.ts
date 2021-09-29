import { WeatherTableComponent } from './weather-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { WeatherApiInputsModule } from '../weather-api-inputs/weather-api-inputs.module';
import { WeatherTableRoutingModule } from './weather-table-routing.module';

@NgModule({
  declarations: [WeatherTableComponent],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    WeatherApiInputsModule,
    WeatherTableRoutingModule,
  ],
})
export class WeatherTableModule {}
