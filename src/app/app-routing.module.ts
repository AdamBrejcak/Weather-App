import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserLoggedGuard } from './core/user-logged-guard/user-logged.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [UserLoggedGuard],
    loadChildren: () => import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'map',
    loadChildren: () => import('./features/map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'weathertable/:cityCode/:dateFrom/:dateTo',
    loadChildren: () => import('./features/weather-table/weather-table.module').then((m) => m.WeatherTableModule),
  },
  {
    path: 'linechart/:cityCode/:dateFrom/:dateTo',
    loadChildren: () => import('./features/line-chart/line-chart.module').then((m) => m.LineChartModule),
  },
  {
    path: 'heatindex/:cityCode/:dateFrom/:dateTo',
    loadChildren: () => import('./features/heat-index/heat-index.module').then((m) => m.HeatIndexModule),
  },
  { path: '**', redirectTo: 'map', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
