import { Component, OnInit } from '@angular/core';
import { HeatIndexService } from './heat-index-service/heat-index.service';
import { FormGroup } from '@angular/forms';
import { LastResultsItem } from 'src/app/features/heat-index/last-results-item/last-results-item';

@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.scss'],
})
export class HeatIndexComponent implements OnInit {
  temperature!: number;
  humidity!: number;
  heatIndex!: string;
  lastResults: LastResultsItem[] = [];
  heatIndexForm!: FormGroup;
  temperatureUnits: string[] = ['Celsius', 'Fahrenheit'];

  constructor(private heatIndexService: HeatIndexService) {}

  ngOnInit(): void {
    this.heatIndexForm = this.heatIndexService.createHeatIndexForm();
    this.lastResults = this.heatIndexService.getLocalStorageResults();
  }

  numbersOnly(event: { which: any; keyCode: any }): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode != 13 && charCode > 31 && charCode != 46 && (charCode < 48 || charCode > 57)) {
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
    resultInFahrenheit = this.heatIndexService.calculateHeatIndex(temperature, this.heatIndexForm.value.hum);
    this.heatIndex = this.heatIndexService.getHeatIndexInChosenUnits(resultInFahrenheit, this.heatIndexForm.value.unit);
    this.addResultToLastResults(resultInFahrenheit);
    this.heatIndexForm.reset();
  }

  addResultToLastResults(resultInFahrenheit: number) {
    this.lastResults = this.lastResults.slice(0, 4);
    this.lastResults.unshift(
      new LastResultsItem(resultInFahrenheit, this.heatIndexService.convertFahrenheitToCelsius(resultInFahrenheit))
    );
    this.heatIndexService.changeLocalStorageResults(this.lastResults);
  }

  get f() {
    return this.heatIndexForm.controls;
  }
}
