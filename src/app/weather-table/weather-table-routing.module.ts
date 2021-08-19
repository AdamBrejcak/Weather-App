import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WeatherTableComponent } from './weather-table.component';



const routes: Routes = [
  {
    path: '',
    component: WeatherTableComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherTableRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/