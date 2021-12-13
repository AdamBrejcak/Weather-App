import { Injectable } from '@angular/core';
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
import Text from 'ol/style/Text';
import Stroke from 'ol/style/Stroke';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import * as olProj from 'ol/proj';
import { Overlay } from 'ol';
import { TranslateService } from '@ngx-translate/core';
import { ColorGradientService } from 'src/app/core/color-gradient-service/color-gradient.service';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OpenLayersMapService {
  constructor(private ngxTranslateService: TranslateService, private colorGradientService: ColorGradientService) {}

  private setMarkerClickEvents(
    map: Map,
    popupContent: HTMLElement,
    popupSubmit: HTMLElement,
    overlay: Overlay,
    cityChoosen: EventEmitter<number>
  ) {
    map.on('click', (evt: any) => {
      var pixel = evt.pixel;
      overlay.setPosition(undefined);
      map.forEachFeatureAtPixel(pixel, (feature: any) => {
        let chooseCity = this.ngxTranslateService.instant('MAP.CHOOSE');
        popupContent.innerHTML = `
        <h4>${feature.values_.name}</h4>
        <p>${feature.values_.note ? feature.values_.note : this.ngxTranslateService.instant('MAP.MISSING_NOTE')}</p>`;
        popupSubmit.innerHTML = `
        <a
          class="ol-popup-submit-a p-ripple p-button"
          id="mapSubmit"
          >
          ${chooseCity}
        </a>`;
        popupSubmit.addEventListener('click', () => cityChoosen.emit(feature.values_.code));
        overlay.setPosition(evt.coordinate);
      });
    });
  }

  private setMarkerCursorPointer(map: Map) {
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

  initMap(
    cities: City[],
    popup: HTMLElement,
    popupContent: HTMLElement,
    popupCloser: HTMLElement,
    popupSubmit: HTMLElement,
    cityChoosen: EventEmitter<number>
  ): Promise<Map> {
    return new Promise((resolve) => {
      const overlay = new Overlay({
        element: popup,
        autoPan: true,
        autoPanAnimation: {
          duration: 250,
        },
      });

      popupCloser.onclick = () => {
        overlay.setPosition(undefined);
        popupCloser.blur();
        return false;
      };

      let map = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          this.newVectorLayer(cities),
        ],
        view: new View({
          center: olProj.fromLonLat([0, 0]),
          zoom: 1,
        }),
        overlays: [overlay],
      });

      this.setMarkerClickEvents(map, popupContent, popupSubmit, overlay, cityChoosen);
      this.setMarkerCursorPointer(map);

      resolve(map);
    });
  }

  newVectorLayer(cities: City[]) {
    let features: Array<Feature<Point>> = [];
    let gradientColors = this.colorGradientService.generateColor('FF0000', '0000FF', cities.length);

    for (let index = 0; index < cities.length; index++) {
      const element: City = cities[index];
      const cityMarker = new Feature({
        geometry: new Point(olProj.fromLonLat([element.longitude, element.latitude])),
        name: element.name,
        code: element.code,
        note: element.note,
      });

      cityMarker.setStyle(
        new Style({
          image: new Circle({
            radius: 6,
            fill: new Fill({
              color: `${gradientColors[index]}`,
            }),
          }),
          text: new Text({
            font: '12px Roboto,sans-serif',
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({
              color: '#fff',
              width: 2,
            }),
            text: `${element.name}`,
            offsetY: 15,
          }),
        })
      );
      features.push(cityMarker);
    }

    let vector = new VectorLayer({
      source: new VectorSource({
        features: features,
      }),
    });

    return vector;
  }
}
