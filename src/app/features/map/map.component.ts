import { Component, OnInit } from '@angular/core';
import { OpenLayersMapService } from './open-layers-service/open-layers-map.service';
import { CitiesNotesService } from 'src/app/core/cities-notes-service/cities-notes.service';
import { City } from 'src/app/shared/city/city';
import * as citiesData from '../../shared/cities.json';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MapNoteDialogComponent } from './map-note-dialog/map-note-dialog.component';
import { UserApiInputService } from 'src/app/core/user-api-input-service/user-api-input.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any;
  cities: City[] = (citiesData as any).default;
  mapForm!: FormGroup;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private citiesNotesService: CitiesNotesService,
    private userApiInputService: UserApiInputService,
    private openLayersMapService: OpenLayersMapService,
    private ngxTranslateService: TranslateService,
    private router: Router,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.mapForm = this.openLayersMapService.createMapForm();
    this.map = this.openLayersMapService.initMap();
    this.cities = this.cities.map((cityData) => new City(cityData));

    this.userApiInputService.changeCurrentCityValue(undefined);
    this.openLayersMapService.translateCitiesNames(this.cities);

    let citiesNotes = this.citiesNotesService.getCitiesNotes();
    this.cities.forEach((city: City) => {
      city.note = citiesNotes[city.code];
    });

    this.openLayersMapService.markerClick.pipe(takeUntil(this.componentDestroyed)).subscribe((city) => {
      this.userApiInputService.changeCurrentCityValue(city);
    });

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.openLayersMapService.translateCitiesNames(this.cities);
    });
  }

  onEditNoteClick(editCity: City) {
    const dialogRef = this.matDialog.open(MapNoteDialogComponent, {
      width: '380px',
      data: editCity,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: any) => {
        if (res && res.save) {
          editCity.note = res.newValue;
        }
      });
  }

  onChooseCityClick(city: City) {
    this.userApiInputService.changeCurrentCityValue(city);
    this.router.navigate(['weathertable']);
  }
}
