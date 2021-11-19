import { Component, OnInit } from '@angular/core';
import { OpenLayersMapService} from './open-layers-service/open-layers-map.service'
import { UserInputService } from 'src/app/core/user-input-service/user-input.service';
import { City } from 'src/app/shared/city/city';
import * as citiesData from '../../shared/cities.json';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  map: any;
  cities: City[] = (citiesData as any).default;
  mapForm!: FormGroup;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private userInputService: UserInputService,
    private openLayersMapService: OpenLayersMapService,
    private ngxTranslateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.mapForm = this.openLayersMapService.createMapForm();
    this.map = this.openLayersMapService.initMap();
    this.cities = this.cities.map((cityData) => new City(cityData));

    this.userInputService.changeCurrentCityValue(undefined);
    this.openLayersMapService.translateCitiesNames(this.cities);

    this.openLayersMapService.markerClick.pipe(takeUntil(this.componentDestroyed)).subscribe((city) => {
      this.userInputService.changeCurrentCityValue(city);
    });

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.openLayersMapService.translateCitiesNames(this.cities);
    });
  }

  onChooseCityBtnClick(city: City) {
    this.userInputService.changeCurrentCityValue(city);
    this.router.navigate(['weathertable']);
  }
}
