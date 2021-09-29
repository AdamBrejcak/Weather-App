import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/shared/city/city';
import * as cities from '../../shared/cities.json';
import { OpenLayersMapService } from './open-layers-service/open-layers-map.service';
import { UserInputService } from 'src/app/core/user-input-service/user-input.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  cities: City[] = (cities as any).default;
  map: any;

  constructor(private userInputService: UserInputService, private openLayersService: OpenLayersMapService) {}

  ngOnInit(): void {
    this.map = this.openLayersService.initMap();
    this.userInputService.changeCurrentCityValue(undefined);

    this.openLayersService.markerClick.subscribe((city) => {
      this.userInputService.changeCurrentCityValue(city);
    });
  }
}
