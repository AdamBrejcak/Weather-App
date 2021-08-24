import { formatDate } from "@angular/common";

export class WeatherDataItem {
  created: string;
  applicable_date: string;
  weather_state_name: string;
  wind_direction_compass: string;
  the_temp: number;
  wind_speed: number;
  humidity: number;

  constructor(data: any) {
    this.created = formatDate(data.created, 'hh:mm:ss', 'en-US');
    this.applicable_date = data.applicable_date;
    this.weather_state_name = data.weather_state_name;
    this.wind_direction_compass = data.wind_direction_compass;
    this.the_temp = data.the_temp.toFixed(2);
    this.wind_speed = data.wind_speed.toFixed(2);
    this.humidity = data.humidity;
  }

}
