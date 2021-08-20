import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherDataService {

  constructor(private http:HttpClient) { }
  getWeatherData(pickedDate:String): Observable<Object[]> {
    return this.http.get<Object[]>(`https://thingproxy.freeboard.io/fetch/https://www.metaweather.com/api/location/44418/${pickedDate}/`)
  };
}
