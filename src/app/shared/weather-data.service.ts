import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http:HttpClient) { }
  getWeatherData(pickedDate:String, pickedCity:Number): Observable<Object[]> {
    return this.http.get<Object[]>(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/${pickedCity}/${pickedDate}/`)
  };
}
