import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { City } from 'src/app/shared/city/city';
import { CityNoteDialogComponent } from '../city-note-dialog/city-note-dialog.component';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cities-grid',
  templateUrl: './cities-grid.component.html',
  styleUrls: ['./cities-grid.component.scss'],
})
export class CitiesGridComponent {
  @Input() cities: City[] = [];
  @Output() citiesChange = new EventEmitter<boolean>();
  @Output() cityChoosen = new EventEmitter<number>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private matDialog: MatDialog) {}

  onEditNoteClick(editCity: City) {
    const dialogRef = this.matDialog.open(CityNoteDialogComponent, {
      width: '380px',
      data: editCity,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: any) => {
        if (res && res.save) {
          editCity.note = res.newValue;
          if (this.cities.some((city) => city.averageTemperature)) {
            this.citiesChange.emit(true);
          }
        }
      });
  }

  onChooseCityClick(code: number) {
    this.cityChoosen.emit(code);
  }
}
