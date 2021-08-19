import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.scss']
})
export class HeatIndexComponent implements OnInit {
  // define variables
  temperatureUnits: any[];
  units: string = "celsius";
  temperature!: number;
  humidity!: number;
  heatIndexC!: number;
  heatIndexF!: number;
  lastResults: any[] = [];
  heatIndexForm!: FormGroup;

  // define methods
  addResult(){
    if (this.lastResults.length <= 4) {
      this.lastResults.unshift();
    };
      this.lastResults = this.lastResults.slice(0,4);
      this.lastResults.unshift({
        "heatIndexFahrenheit":this.heatIndexF,
        "heatIndexCelsius":this.heatIndexC,
      });
  };

  calculateHeatIndex (temperature:number, humidity:number) {
    if ((this.heatIndexForm.value.unit === "celsius" && (temperature >= 26.7) && this.heatIndexForm.value.hum) || (this.heatIndexForm.value.unit === "fahrenheit" && (temperature >= 80)) && this.heatIndexForm.value.hum) {
      if (this.heatIndexForm.value.unit === "celsius") {
        temperature = ((9/5) * temperature + 32);
      };
      this.heatIndexF = -42.379 + 2.04901523*temperature + 10.14333127*humidity
      - .22475541*temperature*humidity - .00683783*temperature*temperature
      - .05481717*humidity*humidity + .00122874*temperature*temperature*humidity
      + .00085282*temperature*humidity*humidity - .00000199*temperature*temperature*humidity*humidity;
      this.heatIndexC = ((this.heatIndexF -32)*5)/9;
      this.addResult();
      }
    else{
      window.alert("Can't calculate");
    };
  };

  createHeatIndexForm() {
    this.heatIndexForm = new FormGroup({
      hum: new FormControl(this.humidity, [
        Validators.required,
        Validators.min(0),
        Validators.max(100),
      ]),
      tempC: new FormControl(this.temperature, [
        Validators.required,
        Validators.min(26.7),
      ]),
      tempF: new FormControl(this.temperature, [
        Validators.required,
        Validators.min(80),
      ]),
      unit: new FormControl(this.units, [
      ]),
    }); 
  };

  get hum() {
    return this.heatIndexForm.get('hum')!;
  };
  get tempC() {
    return this.heatIndexForm.get('tempC')!;
  };
  get tempF() {
    return this.heatIndexForm.get('tempF')!;
  };
  get unit() {
    return this.heatIndexForm.get('unit')!;
  };

  constructor() {
    this.temperatureUnits = [{label: 'Celsius', value: 'celsius'}, {label: 'Fahrenheit', value: 'fahrenheit'}];
  };

  ngOnInit(): void {
    this.createHeatIndexForm();
  };
};
