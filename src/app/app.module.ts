import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table'
import {CalendarModule} from 'primeng/calendar';
import {TabMenuModule} from 'primeng/tabmenu';
import {ListboxModule} from 'primeng/listbox';
import {SliderModule} from 'primeng/slider';

import { NgApexchartsModule } from "ng-apexcharts";

import { HeatIndexComponent } from './heat-index/heat-index.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { LineChartComponent } from './line-chart/line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeatIndexComponent,
    WeatherTableComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputTextModule,
    SelectButtonModule,
    FormsModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    NgApexchartsModule,
    TabMenuModule,
    ListboxModule,
    SliderModule,
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
