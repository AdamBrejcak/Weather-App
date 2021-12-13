import { SelectCityComponent } from './select-city.component';
import { SelectCityRoutingModule } from './select-city-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { CityNoteDialogComponent } from './city-note-dialog/city-note-dialog.component';
import { TextShorthandPipe } from './text-shorthand-pipe/text-shorthand.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MapComponent } from './map-component/map.component';
import { CitiesGridComponent } from './cities-grid-component/cities-grid.component';

@NgModule({
  declarations: [SelectCityComponent, CityNoteDialogComponent, TextShorthandPipe, MapComponent, CitiesGridComponent],
  entryComponents: [],
  imports: [
    SelectCityRoutingModule,
    CommonModule,
    MatDialogModule,
    TranslateModule,
    TableModule,
    RadioButtonModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [SelectCityComponent],
  bootstrap: [],
})
export class SelectCityModule {}
