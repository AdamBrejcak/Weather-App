import { Injectable } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from '../custom.validators';

@Injectable({
  providedIn: 'root'
})
export class HeatIndexService {

  constructor(private formBuilder: FormBuilder) {}

  createHeatIndexForm(): FormGroup {
    let heatIndexForm: FormGroup;
    heatIndexForm = this.formBuilder.group(
      {
        hum: ['', Validators.required],
        temp: ['', Validators.required],
        unit: ['Celsius', Validators.required],
      },
      { validator: CustomValidators.temperatureValidator('temp', 'unit') }
    );
    return heatIndexForm;
  }

  calculateHeatIndex(temperature: number, humidity: number): number {
    let result =
      -42.379 + 2.04901523 * temperature +
      10.14333127 * humidity -
      0.22475541 * temperature * humidity -
      0.00683783 * temperature * temperature -
      0.05481717 * humidity * humidity +
      0.00122874 * temperature * temperature * humidity +
      0.00085282 * temperature * humidity * humidity -
      0.00000199 * temperature * temperature * humidity * humidity;
    return result;
  }

  getHeatIndexInChoosenUnits(resultInFahrenheit: number, heatIndexUnit:string): string {
    if (heatIndexUnit === 'Celsius') {
      return `${this.convertFahrenheitToCelsius(resultInFahrenheit).toFixed(2)} °C`;
    } else {
      return `${resultInFahrenheit.toFixed(2)} °F`;
    }
  }

  convertFahrenheitToCelsius(temperatureInFahrenheit: number): number {
    return ((temperatureInFahrenheit - 32) * 5/9);
  }

  convertCelsiusToFahrenheit(temperatureInCelsius: number): number {
    return ((9 / 5) * temperatureInCelsius + 32);
  }

}
