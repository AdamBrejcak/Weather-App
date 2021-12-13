import { Component, OnInit, ViewChild } from '@angular/core';
import { CitiesNotesService } from 'src/app/core/cities-notes-service/cities-notes.service';
import { City } from 'src/app/shared/city/city';
import * as citiesData from '../../shared/cities.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MapComponent } from './map-component/map.component';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss'],
})
export class SelectCityComponent implements OnInit {
  cities: City[] = (citiesData as any).default;
  toggleViewForm!: FormGroup;
  loading: any = { value: false };
  error: any = { value: undefined };
  @ViewChild('map') map!: MapComponent;
  viewChanged: Subject<string> = new Subject<string>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private citiesNotesService: CitiesNotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxTranslateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.toggleViewForm = this.formBuilder.group({
      toggleMapView: ['map'],
    });

    this.cities = this.cities.map((cityData) => new City(cityData));

    let citiesNotes = this.citiesNotesService.getCitiesNotes();
    this.cities.forEach((city: City) => {
      city.note = citiesNotes[city.code];
    });

    this.translateCitiesNames();

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.translateCitiesNames();
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

  translateCitiesNames() {
    this.cities.forEach((city: City) => {
      city.name = this.ngxTranslateService.instant('API_INPUTS.CITIES.' + city.translationName);
    });
  }
}
