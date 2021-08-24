import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeatIndexComponent } from './heat-index.component';

const routes: Routes = [
  {
    path: '',
    component: HeatIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class HeatIndexRoutingModule {}
