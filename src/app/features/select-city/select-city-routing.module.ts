import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContentWithHeadingComponent } from 'src/app/core/content-with-heading/content-with-heading.component';
import { SelectCityComponent } from './select-city.component';

const routes: Routes = [
  {
    path: '',
    component: ContentWithHeadingComponent,
    children: [
      {
        path: '',
        component: SelectCityComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectCityRoutingModule {}
