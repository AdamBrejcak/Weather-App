import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { merge, Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { WeatherTableItem } from 'src/app/features/weather-table/weather-table-item/weather-table-item';
import { WeatherDataService } from '../../core/weather-data-service/weather-data.service';
import { UserInputs } from 'src/app/shared/user-inputs/user-inputs';

@Component({
  selector: 'app-weather-table',
  templateUrl: './weather-table.component.html',
  styleUrls: ['./weather-table.component.scss'],
})
export class WeatherTableComponent {
  @ViewChild('dt') dt: Table | undefined | any;
  weatherData: WeatherTableItem[] = [];
  error: any = null;
  loading: boolean = false;
  filterFields: string[] = [
    'id',
    'created',
    'applicable_date',
    'weather_state_name',
    'wind_direction_compass',
    'min_temp',
    'max_temp',
    'wind_speed',
    'humidity',
  ];
  private cancelRequest: Subject<void> = new Subject<void>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private weatherDataService: WeatherDataService) {}

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  applyFilterGlobal($event: any, stringVal: any) {
    this.dt.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  onInputChange(emitedData: UserInputs) {
    if (!emitedData.city) {
      return;
    }
    this.cancelRequest.next();
    this.error = null;
    this.loading = true;

    this.weatherDataService
      .loadWeatherTableData(emitedData)
      .pipe(
        takeUntil(merge(this.componentDestroyed, this.cancelRequest)),
        finalize(() => this.loading = false)
      )
      .subscribe(
        (res: WeatherTableItem[]) => {
          this.error = this.weatherDataService.checkDataLength(res);
          this.weatherData = res;
        },
        (err: any) => this.error = err
      );
  }
}
