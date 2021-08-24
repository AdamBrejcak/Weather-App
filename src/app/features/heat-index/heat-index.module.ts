import { HeatIndexComponent } from './heat-index.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';

import { HeatIndexRoutingModule } from './heat-index-routing.module';

@NgModule({
  declarations: [HeatIndexComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    InputTextModule,
    CascadeSelectModule,
    CalendarModule,
    ButtonModule,

    HeatIndexRoutingModule,
  ],
})
export class HeatIndexModule {}
