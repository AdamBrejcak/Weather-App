import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiInputsComponent } from './weather-api-inputs.component';
import { CalendarModule } from 'primeng/calendar';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { PrimeNgCalendarMaskModule } from 'racoon-mask-primeng';

@NgModule({
  declarations: [
    WeatherApiInputsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    CascadeSelectModule,
    PrimeNgCalendarMaskModule
  ],
  exports: [
    WeatherApiInputsComponent
  ]
})
export class WeatherApiInputsModule { }
