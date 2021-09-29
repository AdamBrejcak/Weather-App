import { formatDate } from '@angular/common';

export class WeatherTableItem {
  id: string;
  created: string;
  applicable_date: string;
  weather_state_name: string;
  wind_direction_compass: string;
  min_temp: number;
  max_temp: number;
  wind_speed: number;
  humidity: number;
  air_pressure: number;
  visibility: number;

  constructor(data: any) {
    this.id = data.id;
    this.created = formatDate(data.created, 'yyyy/MM/dd hh:mm', 'en-US');
    this.applicable_date = formatDate(data.applicable_date, 'yyyy/MM/dd', 'en-US');
    this.weather_state_name = data.weather_state_name;
    this.wind_direction_compass = data.wind_direction_compass;
    this.max_temp = data.min_temp.toFixed(2);
    this.min_temp = data.max_temp.toFixed(2);
    this.wind_speed = data.wind_speed.toFixed(2);
    this.humidity = data.humidity;
    this.air_pressure = data.air_pressure;
    this.visibility = data.visibility?.toFixed(2);
  }
}
