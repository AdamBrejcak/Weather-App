import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import { OpenLayersMapService } from '../open-layers-service/open-layers-map.service';
import Map from 'ol/Map';
import { WeatherDataService } from 'src/app/core/weather-data-service/weather-data.service';
import { merge, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CitiesService } from 'src/app/core/cities-service/cities.service';
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/core/authentication-service/authentication.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  map!: any;
  userLogged!: boolean;
  @Input() cities: City[] = [];
  @Input() loading: any;
  @Input() error: any;
  @Input() viewChanged!: Subject<string>;
  @Output() cityChoosen = new EventEmitter<number>();
  @Output() citiesChange = new EventEmitter<boolean>();
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private openLayersMapService: OpenLayersMapService,
    private elementRef: ElementRef,
    private weatherDataService: WeatherDataService,
    private citiesService: CitiesService,
    private appUtilsService: AppUtilsService,
    private matDialog: MatDialog,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authenticationService.userLogged
      .pipe(takeUntil(merge(this.componentDestroyed, this.viewChanged)))
      .subscribe((res:any) => {
        this.userLogged = res.loggedIn;
      });

    this.fullLoadMap();

    this.viewChanged.subscribe((res) => {
      if (res === 'map' && !this.map) {
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
    this.error.value = undefined;
    this.weatherDataService
      .loadCitiesDataForMap(this.cities)
      .pipe(takeUntil(merge(this.componentDestroyed, this.viewChanged)))
      .subscribe(
        (res: any) => {
          res.forEach((cityData: any, index: number) => {
            this.cities[index].averageTemperature =
              this.weatherDataService.calculateAverageTemperatureForDays(cityData);
          });

          this.citiesService.changeCities(this.cities);
          this.cities = this.appUtilsService.sortDataByValue(this.cities, 'averageTemperature');
          this.openLayersMapService
            .initMap(
              this.cities,
              this.elementRef.nativeElement.querySelector('#popup'),
              this.elementRef.nativeElement.querySelector('#popupContent'),
              this.elementRef.nativeElement.querySelector('#popupCloser'),
              this.elementRef.nativeElement.querySelector('#popupEdit'),
              this.elementRef.nativeElement.querySelector('#popupSubmit'),
              this.cityChoosen,
              this.matDialog,
              this.citiesChange
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
    this.citiesService.currentCities.pipe(take(1)).subscribe((res) => {
      if (this.map) {
        this.cities = res;
        let oldVectorLayer: any = this.map.getLayers();
        this.map.removeLayer(oldVectorLayer.array_[1]);
        this.map.addLayer(this.openLayersMapService.newVectorLayer(this.cities));
      }
    });
  }
}
