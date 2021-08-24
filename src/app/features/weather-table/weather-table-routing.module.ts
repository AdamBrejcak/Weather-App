import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherTableComponent } from './weather-table.component';

const routes: Routes = [
  {
    path: '',
    component: WeatherTableComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherTableRoutingModule {}
