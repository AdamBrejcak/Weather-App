import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities-service/cities.service';
import { City } from 'src/app/shared/city/city';

@Component({
  selector: 'edit-city-dialog',
  templateUrl: 'edit-city-dialog.component.html',
  styleUrls: ['./edit-city-dialog.component.scss'],
})
export class EditCityDialogComponent implements OnInit {
  editCityForm!: FormGroup;
  loading: any = { value: false };

  constructor(
    public dialogRef: MatDialogRef<EditCityDialogComponent>,
    private formBuilder: FormBuilder,
    private citiesService: CitiesService,
    @Inject(MAT_DIALOG_DATA) public city: City
  ) {}

  ngOnInit(): void {
    this.editCityForm = this.formBuilder.group({
      name: [this.city.name, [Validators.required]],
      code: [this.city.code, [Validators.required]],
      longitude: [this.city.longitude, [Validators.required]],
      latitude: [this.city.latitude, [Validators.required]],
      note: [this.city.note],
    });
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onFormSubmit(): void {
    this.loading.value = true;
    this.citiesService.currentCities.pipe(take(1)).subscribe((res) => {
      let newCities: City[] = res;
      let cityIndex = newCities.findIndex((x) => x.code === this.city.code);
      newCities[cityIndex] = new City(this.editCityForm.value);
      this.citiesService.changeCityNote(this.city.code, this.editCityForm.controls.note.value);
      this.citiesService.changeCities(newCities);
      this.loading.value = false;
      this.dialogRef.close(true);
    });
  }

  get f() {
    return this.editCityForm.controls;
  }
}
