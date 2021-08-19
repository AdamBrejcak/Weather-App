import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LineChartComponent } from './line-chart.component';



const routes: Routes = [
  {
    path: '',
    component: LineChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LineChartRoutingModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/