import { Component, OnInit } from '@angular/core';
import { HeatIndexService } from './heat-index-service/heat-index.service';
import { LocalStorageDataService } from '../../core/local-storage-data-service/local-storage-data.service';
import { FormGroup } from '@angular/forms';
import { LastResultsItem } from 'src/app/shared/last-results-item/last-results-item';

@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.scss'],
})

export class HeatIndexComponent implements OnInit {
  temperature!: number;
  humidity!: number;
  heatIndex!: string;
  lastResults: any[] = [];
  heatIndexForm!: FormGroup;
  temperatureUnits: string[] = [ 'Celsius','Fahrenheit' ];

  constructor(
    private heatIndexService: HeatIndexService,
    private localStorageDataService: LocalStorageDataService,
  ) {}

  ngOnInit(): void {
    this.heatIndexForm = this.heatIndexService.createHeatIndexForm();
    this.lastResults = this.localStorageDataService.getLocalStorageResults();
  }

  numbersOnly(event: { which: any; keyCode: any; }): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 13 && charCode > 31 && (charCode != 46 &&(charCode < 48 || charCode > 57))){
      return false;
    }
    return true;
  }

  onFormSubmit() {
    let temperature: number = this.heatIndexForm.value.temp;
    if (this.heatIndexForm.value.unit === 'Celsius') {
      temperature = this.heatIndexService.convertCelsiusToFahrenheit(this.heatIndexForm.value.temp);
    }
    let resultInFahrenheit: number;
    resultInFahrenheit = this.heatIndexService.calculateHeatIndex(
      temperature,
      this.heatIndexForm.value.hum,
    );
    this.heatIndex = this.heatIndexService.getHeatIndexInChoosenUnits(resultInFahrenheit, this.heatIndexForm.value.unit);
    this.addResultToLastResults(resultInFahrenheit);
    this.heatIndexForm = this.heatIndexService.createHeatIndexForm();
  }

  addResultToLastResults(resultInFahrenheit: number) {
    this.lastResults = this.lastResults.slice(0, 4);
    this.lastResults.unshift(new LastResultsItem(
      resultInFahrenheit,
      this.heatIndexService.convertFahrenheitToCelsius(resultInFahrenheit),
    ));
    this.localStorageDataService.changeLocalStorageResults(this.lastResults);
  }

  get f() {
    return this.heatIndexForm.controls;
  }

}
