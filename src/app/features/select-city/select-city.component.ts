import { Component, OnInit, ViewChild } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent } from './map-component/map.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities-service/cities.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCityDialogComponent } from './add-city-dialog/add-city-dialog.component';
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit {
  cities!: City[];
  toggleViewForm!: FormGroup;
  loading: any = { value: false };
  error: any = { value: undefined };
  @ViewChild('map') map!: MapComponent;
  viewChanged: Subject<string> = new Subject<string>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private citiesService: CitiesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxTranslateService: TranslateService,
    private matDialog: MatDialog,
    private appUtilsService: AppUtilsService
  ) {}

  ngOnInit(): void {
    this.toggleViewForm = this.formBuilder.group({
      toggleMapView: ['map'],
    });

    this.citiesService.currentCities.pipe(takeUntil(this.componentDestroyed)).subscribe((res) => {
      this.cities = res;
      this.cities = this.appUtilsService.sortDataByValue(this.cities, 'averageTemperature');

      this.cities = this.cities.map((cityData) => new City(cityData));
      this.citiesService.currentNotes.pipe(takeUntil(this.componentDestroyed)).subscribe((res) => {
        this.cities.forEach((city: City) => {
          city.note = res[city.code];
        });
      });
    });

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.map.redrawVectorLayer();
    });

    this.toggleViewForm.controls.toggleMapView.valueChanges.subscribe((res) => {
      this.viewChanged.next(res);
    });
  }

  onCitiesChange() {
    this.map.redrawVectorLayer();
  }

  onCityChoosen(code: number) {
    let actualDateMidnight = new Date().setHours(0, 0, 0, 0);
    this.router.navigate(['/weathertable', code, actualDateMidnight, actualDateMidnight]);
  }

  onAddCityClick() {
    const dialogRef = this.matDialog.open(AddCityDialogComponent, {
      width: '380px',
      minHeight: 'calc(500px)',
      height: 'auto',
      data: this.cities,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: boolean) => {
        if (res) {
          this.map.redrawVectorLayer();
        }
      });
  }
}
