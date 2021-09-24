import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as data from '../../shared/cities.json';
import { City } from 'src/app/shared/city/city';
import { DateCity } from 'src/app/shared/date-city/date-city';
import { Output, EventEmitter } from '@angular/core';
import { UserInputService } from 'src/app/core/user-input-service/user-input.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-weather-api-inputs',
  templateUrl: './weather-api-inputs.component.html',
  styleUrls: ['./weather-api-inputs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherApiInputsComponent implements OnInit, OnDestroy {
  chosenDate!: Date;
  maxDateValue: Date = new Date();
  chosenCity!: City | undefined;
  cities: City[] = (data as any).default;
  weatherInputsForm!: FormGroup;
  @Output() change = new EventEmitter<DateCity>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private userInputService: UserInputService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userInputService.currentCityValue.pipe(takeUntil(this.componentDestroyed)).subscribe((res: City|undefined) => {
      this.chosenCity = res;
    })
    this.userInputService.currentDateValue.pipe(takeUntil(this.componentDestroyed)).subscribe((res: Date) => {
      this.chosenDate = new Date(res);
    })

    this.change.emit(new DateCity(this.chosenDate, this.chosenCity));
    this.weatherInputsForm = this.createWeatherInputsForm();
    this.emitAndSaveDate();
    this.emitAndSaveCity();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  createWeatherInputsForm(): FormGroup {
    let tempForm: FormGroup;
    tempForm = this.formBuilder.group({
      city: [this.chosenCity],
      date: [this.chosenDate],
    });
    return tempForm;
  }

  emitAndSaveDate() {
    this.weatherInputsForm.controls.date.valueChanges.subscribe(
      (newDate: Date) => {
        if (
          this.isDateValid(this.weatherInputsForm.value['date'], newDate)
        ) {
          this.change.emit(
            new DateCity(newDate, this.weatherInputsForm.value.city)
          );
          this.userInputService.changeCurrentDateValue(newDate);
        }
      }
    );
  }

  isDateValid(oldDate: Date, newDate: Date): boolean {
    return (
      this.formatDate(newDate).length === 10 && this.formatDate(oldDate) !== this.formatDate(newDate)
    );
  }

  emitAndSaveCity() {
    this.weatherInputsForm.controls.city.valueChanges.subscribe(
      (newCity: City) => {
        if (newCity.code !== this.weatherInputsForm.value['city'].code) {
          this.change.emit(
            new DateCity(this.weatherInputsForm.value.date, newCity)
          );
          this.userInputService.changeCurrentCityValue(newCity);
        }
      }
    );
  }

  formatDate(date: Date): string {
    return formatDate(date, 'yyyy/MM/dd', 'en-US');
  }
}
