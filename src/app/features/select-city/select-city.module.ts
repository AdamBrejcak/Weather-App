import { SelectCityComponent } from './select-city.component';
import { SelectCityRoutingModule } from './select-city-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCityDialogComponent } from './edit-city-dialog/edit-city-dialog.component';
import { TextShorthandPipe } from './text-shorthand-pipe/text-shorthand.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPermissionsModule } from 'ngx-permissions';
import { MapComponent } from './map-component/map.component';
import { CitiesGridComponent } from './cities-grid-component/cities-grid.component';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    SelectCityComponent,
    EditCityDialogComponent,
    AddCityDialogComponent,
    TextShorthandPipe,
    MapComponent,
    CitiesGridComponent,
  ],
  entryComponents: [],
  imports: [
    SelectCityRoutingModule,
    CommonModule,
    TranslateModule,
    TableModule,
    RadioButtonModule,
    ButtonModule,
    InputTextareaModule,
    InputTextModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    TooltipModule,
    NgxPermissionsModule.forChild(),
  ],
  exports: [SelectCityComponent],
  bootstrap: [],
})
export class SelectCityModule {}
