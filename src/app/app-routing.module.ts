import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"", redirectTo:"/weathertable", pathMatch:"full"},
  {path:"weathertable", loadChildren: () => import('./features/weather-table/weather-table.module').then(m => m.WeatherTableModule)},
  {path:"linechart", loadChildren: () => import('./features/line-chart/line-chart.module').then(m => m.LineChartModule)},
  {path:"heatindex", loadChildren: () => import('./features/heat-index/heat-index.module').then(m => m.HeatIndexModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
