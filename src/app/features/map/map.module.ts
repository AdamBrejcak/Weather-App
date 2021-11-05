import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    TranslateModule
  ],
  exports: [MapComponent]
})
export class MapModule { }
