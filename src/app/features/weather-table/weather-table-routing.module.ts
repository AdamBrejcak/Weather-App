import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherTableComponent } from './weather-table.component';
import { ContentWithMenuComponent } from '../../core/content-with-menu/content-with-menu.component';
import { ContentWithHeadingComponent } from 'src/app/core/content-with-heading/content-with-heading.component';

const routes: Routes = [
  {
    path: '',
    component: ContentWithHeadingComponent,
    children: [
      {
        path: '',
        component: ContentWithMenuComponent,
        children: [
          {
            path: '',
            component: WeatherTableComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WeatherTableRoutingModule {}
