import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeatIndexComponent } from './heat-index.component';
import { ContentWithMenuComponent } from '../../core/content-with-menu/content-with-menu.component';

const routes: Routes = [
  {
    path: '',
    component: ContentWithMenuComponent,
    children: [
      {
        path: '',
        component: HeatIndexComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeatIndexRoutingModule {}
