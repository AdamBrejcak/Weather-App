import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities-service/cities.service';
import { City } from 'src/app/shared/city/city';
import { EditCityDialogComponent } from '../edit-city-dialog/edit-city-dialog.component';
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

  constructor(private matDialog: MatDialog, private citiesService: CitiesService) {}

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  onEditNoteClick(editCity: City) {
    const dialogRef = this.matDialog.open(EditCityDialogComponent, {
      width: '380px',
      height: '500px',
      data: editCity,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: boolean) => {
        if (res) {
          this.citiesChange.emit(true);
        }
      });
  }

  onChooseCityClick(code: number) {
    this.cityChoosen.emit(code);
  }

  onDeleteCityClick(cityCode: number) {
    this.citiesService.deleteCity(cityCode);
    this.citiesChange.emit(true);
  }
}
