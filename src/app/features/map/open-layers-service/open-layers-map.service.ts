import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { City } from 'src/app/shared/city/city';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import Style from 'ol/style/Style';
import Circle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Subject } from 'rxjs';
import * as olProj from 'ol/proj';
import * as data from '../../../shared/cities.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class OpenLayersMapService {
  private onMarkerClickSource: Subject<City | undefined> = new Subject();
  public readonly markerClick = this.onMarkerClickSource.asObservable();
  cities: City[] = (data as any).default;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ngxTranslateService: TranslateService
  ) {}

  createMapForm(): FormGroup {
    return this.formBuilder.group({
      toggleMapView: ['map'],
    });
  }

  translateCitiesNames(cities: City[]) {
    cities.forEach((city: City) => {
      city.name = this.ngxTranslateService.instant('API_INPUTS.CITIES.' + city.translationName);
    });
  }

  initMap(): Map {
    let features: Array<Feature<Point>> = [];
    let map: Map;

    for (let index = 0; index < this.cities.length; index++) {
      const element: City = this.cities[index];
      const cityMarker = new Feature({
        geometry: new Point(olProj.fromLonLat([element.longitude, element.latitude])),
        code: element.code,
      });
      features.push(cityMarker);
    }

    map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: new VectorSource({
            features: features,
          }),
          style: new Style({
            image: new Circle({
              radius: 6,
              fill: new Fill({
                color: 'rgba(0,0,230,0.9)',
              }),
            }),
          }),
        }),
      ],
      view: new View({
        center: olProj.fromLonLat([0, 0]),
        zoom: 1,
      }),
    });

    this.setMarkerClickEvents(map);
    this.setMarkerCursorPointer(map);

    return map;
  }

  setMarkerClickEvents(map: Map) {
    map.on('click', (evt: any) => {
      var pixel = evt.pixel;
      map.forEachFeatureAtPixel(pixel, (feature: any) => {
        let clickedCity: any = this.cities.find((x) => x.code === feature.values_.code);
        return this.onMarkerClickSource.next(clickedCity), this.router.navigate(['weathertable']);
      });
    });
  }

  setMarkerCursorPointer(map: Map) {
    map.on('pointermove', (evt: any) => {
      var hit = map.forEachFeatureAtPixel(evt.pixel, function () {
        return true;
      });
      if (hit) {
        return (map.getTargetElement().style.cursor = 'pointer');
      } else {
        return (map.getTargetElement().style.cursor = '');
      }
    });
  }
}