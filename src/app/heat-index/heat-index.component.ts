import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormControl,  Validators } from '@angular/forms';
@Component({
  selector: 'app-heat-index',
  templateUrl: './heat-index.component.html',
  styleUrls: ['./heat-index.component.scss']
})
export class HeatIndexComponent implements OnInit {
  temperature!: number;
  humidity!: number;
  heatIndexC!: number;
  heatIndexF!: number;
  units: string = "celsius";
  temperatureUnits: any[];
  lastResults: number[] = [];
  heatIndexForm!: FormGroup;

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

  addResult(){
    if (this.lastResults.length <= 4) {
      this.lastResults.unshift(this.heatIndexF);
    }
    else{
      this.lastResults = this.lastResults.slice(0,4);
      this.lastResults.unshift(this.heatIndexF);
    }
  };
  calculateHeatIndex (temperature:number, humidity:number) {
    // if((this.heatIndexForm.value.hum && (this.heatIndexForm.value.unit === "celsius" && this.heatIndexForm.value.tempC > 26.6)) || (this.heatIndexForm.value.unit === "fahrenheit" && this.heatIndexForm.value.tempF > 79.9)){

      if (this.heatIndexForm.value.unit === "celsius") {
        temperature = ((9/5) * temperature + 32);
      }
        this.heatIndexF = -42.379 + 2.04901523*temperature + 10.14333127*humidity
        - .22475541*temperature*humidity - .00683783*temperature*temperature
        - .05481717*humidity*humidity + .00122874*temperature*temperature*humidity
        + .00085282*temperature*humidity*humidity - .00000199*temperature*temperature*humidity*humidity;
        this.heatIndexC = ((this.heatIndexF -32)*5)/9;
        this.addResult();
    //   else{
    //     this.heatIndexF = -42.379 + 2.04901523*this.heatIndexForm.value.tempF + 10.14333127*this.heatIndexForm.value.hum
    //     - .22475541*this.heatIndexForm.value.tempF*this.heatIndexForm.value.hum - .00683783*this.heatIndexForm.value.tempF*this.heatIndexForm.value.tempF
    //     - .05481717*this.heatIndexForm.value.hum*this.heatIndexForm.value.hum + .00122874*this.heatIndexForm.value.tempF*this.heatIndexForm.value.tempF*this.heatIndexForm.value.hum 
    //     + .00085282*this.heatIndexForm.value.tempF*this.heatIndexForm.value.hum*this.heatIndexForm.value.hum - .00000199*this.heatIndexForm.value.tempF*this.heatIndexForm.value.tempF*this.heatIndexForm.value.hum*this.heatIndexForm.value.hum;
    //     this.heatIndexC = ((this.heatIndexF-32)*5)/9;
    //     this.addResult();
    //   };
    // }
    // else{
    //   alert("Can't calculate");
    // };
    // this.heatIndexForm.reset(this.heatIndexForm);
    // this.heatIndexForm.value.unit = "celsius";
  };
  constructor() {
    this.temperatureUnits = [{label: 'Celsius', value: 'celsius'}, {label: 'Fahrenheit', value: 'fahrenheit'}];
  };

  ngOnInit(): void {
    this.createHeatIndexForm();
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

};
