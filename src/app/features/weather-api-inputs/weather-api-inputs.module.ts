import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WeatherApiInputsComponent } from './weather-api-inputs.component';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { PrimeNgCalendarMaskModule } from 'racoon-mask-primeng';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [WeatherApiInputsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CalendarModule,
    DropdownModule,
    PrimeNgCalendarMaskModule,
    TranslateModule,
  ],
  exports: [WeatherApiInputsComponent],
})
export class WeatherApiInputsModule {}
