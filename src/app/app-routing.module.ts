import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectedCityGuard } from './core/selected-city-guard/selectedCity.guard';

const routes: Routes = [
  {
    path: 'map',
    loadChildren: () => import('./features/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'weathertable',
    canActivate: [SelectedCityGuard],
    loadChildren: () => import('./features/weather-table/weather-table.module').then((m) => m.WeatherTableModule),
  },
  {
    path: 'linechart',
    canActivate: [SelectedCityGuard],
    loadChildren: () => import('./features/line-chart/line-chart.module').then((m) => m.LineChartModule),
  },
  {
    path: 'heatindex',
    canActivate: [SelectedCityGuard],
    loadChildren: () => import('./features/heat-index/heat-index.module').then((m) => m.HeatIndexModule),
  },
  { path: '**', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
