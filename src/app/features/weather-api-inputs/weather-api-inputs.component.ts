import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';
import { DateOperationsService } from 'src/app/core/date-operations-service/date-operations.service';
import { RouterParamsService } from 'src/app/core/router-params-service/router-params.service';
import { ActivatedRoute } from '@angular/router';
import { CitiesService } from 'src/app/core/cities-service/cities.service';

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
  citiesData!: City[];
  cities: City[] = [];
  weatherInputsForm!: FormGroup;
  @Output() change = new EventEmitter<UserInputs>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private dateOperationsService: DateOperationsService,
    private routerParamsService: RouterParamsService,
    private route: ActivatedRoute,
    private citiesService: CitiesService
  ) {}

  ngOnInit(): void {
    this.citiesService.currentCities.pipe(takeUntil(this.componentDestroyed)).subscribe((res: City[]) => {
      this.cities = res.map((cityData:City)=> new City(cityData));
    });

    this.route.params.pipe(takeUntil(this.componentDestroyed)).subscribe((params) => {
      this.chosenCity = this.cities.find((city) => city.code === Number(params.cityCode));
      this.chosenDateFrom = new Date(Number(params.dateFrom));
      this.chosenDateTo = new Date(Number(params.dateTo));
    });

    this.weatherInputsForm = this.createWeatherInputsForm();

    this.weatherInputsForm.controls.city.patchValue(this.cities.find((city) => city.code === this.chosenCity?.code));

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
      this.routerParamsService.replaceRouteParams(this.weatherInputsForm.value);
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
          this.routerParamsService.replaceRouteParams(newFormValues);
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
