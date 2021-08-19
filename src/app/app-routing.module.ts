import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeatIndexComponent } from './heat-index/heat-index.component';
import { WeatherTableComponent } from './weather-table/weather-table.component';
import { LineChartComponent } from './line-chart/line-chart.component';
const routes: Routes = [
  {path:"", redirectTo:"/heatindex", pathMatch:"full"},
  {path:"heatindex", component:HeatIndexComponent },
  {path:"weathertable", component:WeatherTableComponent },
  {path:"linechart", component:LineChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
