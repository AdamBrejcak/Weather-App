import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities-service/cities.service';
import { WeatherDataService } from 'src/app/core/weather-data-service/weather-data.service';
import { City } from 'src/app/shared/city/city';

@Component({
  selector: 'add-city-dialog',
  templateUrl: 'add-city-dialog.component.html',
  styleUrls: ['./add-city-dialog.component.scss'],
})
export class AddCityDialogComponent implements OnInit {
  addCityForm!: FormGroup;
  loading: any = { value: false };
  error: any = { value: '' };

  constructor(
    public dialogRef: MatDialogRef<AddCityDialogComponent>,
    private formBuilder: FormBuilder,
    private weatherDataService: WeatherDataService,
    private citiesService: CitiesService,
    @Inject(MAT_DIALOG_DATA) public cities: City[]
  ) {}

  ngOnInit(): void {
    this.addCityForm = this.formBuilder.group({
      name: [undefined, [Validators.required]],
      code: [undefined, [Validators.required]],
      longitude: [undefined, [Validators.required]],
      latitude: [undefined, [Validators.required]],
      note: [undefined],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onFormSubmit(): void {
    this.loading.value = true;
    this.error.value = undefined;
    let newCities: City[] = JSON.parse(JSON.stringify(this.cities));
    this.addCityForm.patchValue({ note: this.citiesService.getCityNote(this.addCityForm.controls.code.value) });
    newCities.push(new City(this.addCityForm.value));
    newCities.map((cityData) => new City(cityData));
    this.addCityForm.reset();
    this.weatherDataService
      .loadCitiesDataForMap(newCities)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          if (res) {
            this.loading.value = false;

            for (let index = 0; index < res.length; index++) {
              newCities[index].averageTemperature = this.weatherDataService.calculateAverageTemperatureForDays(
                res[index]
              );
            }
            this.citiesService.changeCities(newCities);
            this.dialogRef.close(true);
          }
        },
        (err: any) => {
          this.loading.value = false;
          this.error.value = err.message;
        }
      );
  }

  get f() {
    return this.addCityForm.controls;
  }
}
