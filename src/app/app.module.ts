import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';

// primeNG components
import {InputTextModule} from 'primeng/inputtext';
import {SelectButtonModule} from 'primeng/selectbutton';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {TabMenuModule} from 'primeng/tabmenu';

// components
import { AppComponent } from './app.component';
import { HeatIndexComponent } from './heat-index/heat-index.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { LineChartComponent } from './line-chart/line-chart.component';

// chart module library
import { NgApexchartsModule } from "ng-apexcharts";
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
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule,
    AppRoutingModule,

    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    TabMenuModule,

    NgApexchartsModule,
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
