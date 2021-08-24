import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WeatherDataItem } from 'src/app/shared/weather-data-item/weather-data-item';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherDataService {
  constructor(private http: HttpClient) {}

  getWeatherData( pickedDate: String, pickedCity: Number ): Observable<WeatherDataItem[]> {
    return this.http
      .get<WeatherDataItem[]>(
        `https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/${pickedCity}/${pickedDate}/`
      )
      .pipe(
        map((result) => {
          let mappedResult = result.map((res) => new WeatherDataItem(res));
          return mappedResult;
        })
      );
  }

}
