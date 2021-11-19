import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapRoutingModule } from './map-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MapComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    TranslateModule,
    TableModule,
    RadioButtonModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  exports: [MapComponent]
})
export class MapModule { }
