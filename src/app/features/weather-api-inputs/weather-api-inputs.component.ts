import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as cities from '../../shared/cities.json';
import { City } from 'src/app/shared/city/city';
import { DateCity } from 'src/app/shared/date-city/date-city';
import { Output, EventEmitter } from '@angular/core';
import { LocalStorageDataService } from '../../core/local-storage-data-service/local-storage-data.service';
import { SessionStorageDataService } from '../../core/session-storage-data-service/session-storage-data.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-weather-api-inputs',
  templateUrl: './weather-api-inputs.component.html',
  styleUrls: ['./weather-api-inputs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherApiInputsComponent implements OnInit {
  choosenDate!: Date;
  maxDateValue: Date = new Date();
  choosenCity!: City;
  cities: City[] = (cities as any).default;
  weatherInputsForm!: FormGroup;
  @Output() change = new EventEmitter<DateCity>();

  constructor(
    private localStorageDataService: LocalStorageDataService,
    private sessionStorageDataService: SessionStorageDataService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.choosenCity = this.localStorageDataService.getLocalStorageCity();
    this.choosenDate = new Date(this.sessionStorageDataService.getSessionStorageDate());
    this.change.emit(new DateCity(this.choosenDate, this.choosenCity));
    this.weatherInputsForm = this.createWeatherInputsForm();
    this.emitAndSaveDate();
    this.emitAndSaveCity();
  }

  createWeatherInputsForm(): FormGroup {
    let tempForm: FormGroup;
    tempForm = this.formBuilder.group({
      city: [this.choosenCity],
      date: [this.choosenDate],
    });
    return tempForm;
  }

  emitAndSaveDate() {
    this.weatherInputsForm.controls.date.valueChanges.subscribe(
      (newDate: Date) => {
        if (
          this.formatDate(newDate).length === 10 &&
          this.formatDate(this.weatherInputsForm.value['date']) !== this.formatDate(newDate)
        ) {
          this.change.emit(
            new DateCity(newDate, this.weatherInputsForm.value.city)
          );
          this.sessionStorageDataService.changeSessionStorageDate(newDate);
          this.weatherInputsForm.value['date'] = newDate;
        }
      }
    );
  }

  emitAndSaveCity() {
    this.weatherInputsForm.controls.city.valueChanges.subscribe(
      (newCity: City) => {
        if (this.weatherInputsForm.value['city'] !== newCity) {
          this.change.emit(
            new DateCity(this.weatherInputsForm.value.date, newCity)
          );
          this.weatherInputsForm.value['city'] = newCity;
          this.localStorageDataService.changeLocalStorageCity(newCity);
        }
      }
    );
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy/MM/dd', 'en-US');
  }

}
