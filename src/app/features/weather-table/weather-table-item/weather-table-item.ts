export class WeatherTableItem {
  id: string;
  created: Date;
  applicable_date: Date;
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
    this.created = new Date(data.created);
    this.applicable_date = new Date(data.applicable_date);
    this.weather_state_name = data.weather_state_name;
    this.wind_direction_compass = data.wind_direction_compass;
    this.max_temp = data.max_temp;
    this.min_temp = data.min_temp;
    this.wind_speed = data.wind_speed;
    this.humidity = data.humidity;
    this.air_pressure = data.air_pressure;
    this.visibility = data.visibility;
  }
}
