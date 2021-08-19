import { Component, OnInit } from '@angular/core';
import { WeatherDataService } from '../weather-data.service';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss']
})
export class WeatherTableComponent implements OnInit {
  // products: Object[] = [{code:"co1",name:"na1",category:"ca1",quantity:"qa1"},{code:"co2",name:"na2",category:"ca2",quantity:"qu2"}];
  weatherData: Object[] = [];
  date: Date = new Date("2013/4/27");
  error: String[] = [];
  loading: boolean = false;
  selectedWeather!: Object;
  
  onDateChange(){
    this.loading = true;
    this.weatherData = [];
    this.weatherDataService.getWeatherData(formatDate(this.date, 'yyyy/MM/dd', 'en-US')).subscribe(
      res => {this.weatherData = res},
      err => {this.error = err}
    );
    setTimeout(() => {
      this.loading = false;
    }, 500);  
    };
    
    constructor(private weatherDataService: WeatherDataService) { }
    
    ngOnInit(): void {
    this.onDateChange();
  }

}
