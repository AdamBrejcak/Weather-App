import { MapComponent } from './map.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MapRoutingModule } from './map-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ReactiveFormsModule } from '@angular/forms';
import { MapNoteDialogComponent } from './map-note-dialog/map-note-dialog.component';
import { TextShorthandPipe } from './text-shorthand-pipe/text-shorthand.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [MapComponent, MapNoteDialogComponent, TextShorthandPipe],
  entryComponents: [],
  imports: [
    CommonModule,
    MatDialogModule,
    MapRoutingModule,
    TranslateModule,
    TableModule,
    RadioButtonModule,
    ButtonModule,
    InputTextareaModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxPermissionsModule.forChild()
  ],
  exports: [MapComponent],
  bootstrap: [],
})
export class MapModule {}
