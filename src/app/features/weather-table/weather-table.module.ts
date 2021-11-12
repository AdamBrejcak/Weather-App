import { WeatherTableComponent } from './weather-table.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { SliderModule } from 'primeng/slider';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';
import { WeatherApiInputsModule } from '../weather-api-inputs/weather-api-inputs.module';
import { WeatherTableRoutingModule } from './weather-table-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { temperaturePipe } from './temperature-pipe/temperature.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WeatherTableComponent, temperaturePipe],
  imports: [
    CommonModule,
    TableModule,
    InputTextModule,
    SliderModule,
    DropdownModule,
    MultiSelectModule,
    WeatherApiInputsModule,
    WeatherTableRoutingModule,
    TranslateModule,
    FormsModule,
  ],
})
export class WeatherTableModule {}
