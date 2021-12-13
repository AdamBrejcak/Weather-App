import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { OpenLayersMapService } from '../open-layers-service/open-layers-map.service';
import Map from 'ol/Map';
import { WeatherDataService } from 'src/app/core/weather-data-service/weather-data.service';
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';
import { merge, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: any;
  @Input() cities: City[] = [];
  @Input() loading: any;
  @Input() error: any;
  @Input() viewChanged!: Subject<string>;
  @Output() cityChoosen = new EventEmitter<number>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private openLayersMapService: OpenLayersMapService,
    private elementRef: ElementRef,
    private weatherDataService: WeatherDataService,
    private appUtilsService: AppUtilsService
  ) {}

  ngOnInit(): void {
    this.fullLoadMap();

    this.viewChanged.subscribe((res) => {
      if (res === 'map' && !this.cities.some((city) => city.averageTemperature)) {
        this.fullLoadMap();
      } else {
        this.loading.value = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  fullLoadMap() {
    this.loading.value = true;
    this.weatherDataService
      .loadCitiesDataForMap(this.cities)
      .pipe(takeUntil(merge(this.componentDestroyed, this.viewChanged)))
      .subscribe(
        (res: any) => {
          res.forEach((cityData: any, index: number) => {
            this.cities[index].averageTemperature =
              this.weatherDataService.calculateAverageTemperatureForDays(cityData);
          });

          this.appUtilsService.sortDataByValue(this.cities, 'averageTemperature');

          this.openLayersMapService
            .initMap(
              this.cities,
              this.elementRef.nativeElement.querySelector('#popup'),
              this.elementRef.nativeElement.querySelector('#popupContent'),
              this.elementRef.nativeElement.querySelector('#popupCloser'),
              this.elementRef.nativeElement.querySelector('#popupSubmit'),
              this.cityChoosen
            )
            .then((newMap: Map) => {
              this.loading.value = false;
              this.map = newMap;
            });
        },
        (err: any) => {
          this.loading.value = false;
          this.error.value = err.message;
        }
      );
  }

  public redrawVectorLayer() {
    let oldVectorLayer: any = this.map.getLayers();
    this.map.removeLayer(oldVectorLayer.array_[1]);
    this.map.addLayer(this.openLayersMapService.newVectorLayer(this.cities));
  }
}
