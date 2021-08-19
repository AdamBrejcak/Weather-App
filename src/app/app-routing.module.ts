import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { HeatIndexComponent } from './heat-index/heat-index.component';
// import { WeatherTableComponent } from './weather-table/weather-table.component';
// import { LineChartComponent } from './line-chart/line-chart.component';

const routes: Routes = [
  {path:"", redirectTo:"/heatindex", pathMatch:"full"},
  {path:"heatindex", loadChildren: () => import('./heat-index/heat-index-routing.module').then(m => m.HeatIndexRoutingModule)},
  {path:"weathertable", loadChildren: () => import('./weather-table/weather-table-routing.module').then(m => m.WeatherTableRoutingModule)},
  {path:"linechart", loadChildren: () => import('./line-chart/line-chart-routing.module').then(m => m.LineChartRoutingModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
