import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { Output, EventEmitter } from '@angular/core';
import { UserInputService } from 'src/app/core/user-input-service/user-input.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';
import { DateOperationsService } from 'src/app/core/date-operations-service/date-operations.service';
import { TranslateService } from '@ngx-translate/core';
import * as citiesData from '../../shared/cities.json';

@Component({
  selector: 'app-weather-api-inputs',
  templateUrl: './weather-api-inputs.component.html',
  styleUrls: ['./weather-api-inputs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherApiInputsComponent implements OnInit, OnDestroy {
  chosenDateFrom!: Date;
  chosenDateTo!: Date;
  chosenCity!: City | undefined;
  maxDateValue: Date = new Date(new Date().setHours(0, 0, 0, 0));
  citiesData: City[] = (citiesData as any).default;
  cities: City[] = [];
  weatherInputsForm!: FormGroup;
  @Output() change = new EventEmitter<UserInputs>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private userInputService: UserInputService,
    private formBuilder: FormBuilder,
    private dateOperationsService: DateOperationsService,
    private ngxTranslateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.cities = this.citiesData.map((cityData) => new City(cityData));
    this.changeCitiesNames();

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.changeCitiesNames();
    });

    this.userInputService.currentCityValue
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: City | undefined) => {
        this.chosenCity = res;
      });

    this.userInputService.currentDateFromValue.pipe(takeUntil(this.componentDestroyed)).subscribe((res: Date) => {
      this.chosenDateFrom = new Date(res);
    });

    this.userInputService.currentDateToValue.pipe(takeUntil(this.componentDestroyed)).subscribe((res: Date) => {
      this.chosenDateTo = new Date(res);
    });

    this.weatherInputsForm = this.createWeatherInputsForm();

    this.weatherInputsForm.controls.city.patchValue(this.cities.find((x) => x.code === this.chosenCity?.code));

    this.change.emit(
      new UserInputs({
        city: this.chosenCity,
        dates: {
          dateFrom: this.chosenDateFrom,
          dateTo: this.chosenDateTo,
        },
      })
    );

    this.onInputChangeEmitAndSave();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  changeCitiesNames() {
    this.cities.forEach(
      (city) => city.name = this.ngxTranslateService.instant('API_INPUTS.CITIES.' + city.translationName)
    );
  }

  createWeatherInputsForm(): FormGroup {
    let tempForm: FormGroup;
    tempForm = this.formBuilder.group({
      city: [this.chosenCity],
      dates: this.formBuilder.group({
        dateFrom: [this.chosenDateFrom],
        dateTo: [this.chosenDateTo],
      }),
    });
    return tempForm;
  }

  dateEqualToToday(): boolean {
    if (this.weatherInputsForm.value.dates['dateTo']) {
      return this.weatherInputsForm.value.dates['dateTo'] >= this.maxDateValue;
    }
    return false;
  }

  decrementDateRange() {
    let dateTo: Date = this.weatherInputsForm.value.dates['dateTo'];
    let dateFrom: Date = this.weatherInputsForm.value.dates['dateFrom'];
    let diffBetweenDates: number = this.dateOperationsService.diffBetweenDates(dateFrom, dateTo);

    this.patchAndSaveFormChanges(
      this.dateOperationsService.removeDaysFromDate(dateFrom, diffBetweenDates),
      this.dateOperationsService.removeDaysFromDate(dateTo, diffBetweenDates)
    );
  }

  incrementDateRange() {
    let dateTo: Date = this.weatherInputsForm.value.dates['dateTo'];
    let dateFrom: Date = this.weatherInputsForm.value.dates['dateFrom'];
    let diffBetweenDates: number = this.dateOperationsService.diffBetweenDates(dateFrom, dateTo);

    if (this.dateOperationsService.addDaysToDate(dateTo, diffBetweenDates).getTime() > this.maxDateValue.getTime()) {
      this.patchAndSaveFormChanges(
        this.dateOperationsService.removeDaysFromDate(this.maxDateValue, diffBetweenDates),
        this.maxDateValue
      );
    } else {
      this.patchAndSaveFormChanges(
        this.dateOperationsService.addDaysToDate(dateFrom, diffBetweenDates),
        this.dateOperationsService.addDaysToDate(dateTo, diffBetweenDates)
      );
    }
  }

  patchAndSaveFormChanges(newDateFrom: Date, newDateTo: Date) {
    this.weatherInputsForm.patchValue({
      dates: { dateFrom: newDateFrom, dateTo: newDateTo },
    }),
      this.userInputService.changeCurrentInputsValues(this.weatherInputsForm.value);
  }

  onInputChangeEmitAndSave() {
    this.weatherInputsForm.valueChanges
      .pipe(startWith(this.weatherInputsForm.value), pairwise())
      .subscribe(([oldFormValues, newFormValues]: [UserInputs, UserInputs]) => {
        if (
          newFormValues.dates.dateFrom &&
          newFormValues.dates.dateTo &&
          JSON.stringify(newFormValues) !== JSON.stringify(oldFormValues)
        ) {
          this.userInputService.changeCurrentInputsValues(newFormValues);
          this.change.emit(
            new UserInputs({
              city: newFormValues.city,
              dates: {
                dateFrom: newFormValues.dates.dateFrom,
                dateTo: newFormValues.dates.dateTo,
              },
            })
          );
        }
      });
  }
}
