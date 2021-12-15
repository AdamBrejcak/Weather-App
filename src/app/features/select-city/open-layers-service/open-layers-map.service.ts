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
import { AppUtilsService } from 'src/app/core/app-utils-service/app-utils.service';
import { take } from 'rxjs/operators';
import { EditCityDialogComponent } from '../edit-city-dialog/edit-city-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class OpenLayersMapService {
  constructor(
    private ngxTranslateService: TranslateService,
    private appUtilsService: AppUtilsService,
    private colorGradientService: ColorGradientService
  ) {}

  private setMarkerClickEvents(
    map: Map,
    popupContent: HTMLElement,
    popupEdit: HTMLElement | any,
    popupSubmit: HTMLElement,
    overlay: Overlay,
    cityChoosen: EventEmitter<number>,
    matDialog: MatDialog,
    citiesChange: EventEmitter<boolean>
  ) {
    function openEditCityModal(evt: any): any {
      const dialogRef = matDialog.open(EditCityDialogComponent, {
        width: '380px',
        height: '500px',
        data: evt.currentTarget.feature.values_,
      });

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((res: boolean) => {
          if (res) {
            overlay.setPosition(undefined);
            citiesChange.emit(true);
          }
        });
    }

    map.on('click', (evt: any) => {
      var pixel = evt.pixel;
      overlay.setPosition(undefined);
      map.forEachFeatureAtPixel(pixel, (feature: any) => {
        popupEdit.removeEventListener('click', openEditCityModal);

        let chooseCity = this.ngxTranslateService.instant('MAP.CHOOSE');
        let editCity = this.ngxTranslateService.instant('MAP.EDIT');
        popupContent.innerHTML = `
        <h4>${feature.values_.name}</h4>
        <p>${feature.values_.note ? feature.values_.note : this.ngxTranslateService.instant('MAP.MISSING_NOTE')}</p>`;
        popupSubmit.innerHTML = `
          <a class="ol-popup-submit-a p-ripple p-button"
          style="border-radius:20px"
          id="mapSubmit">
          ${chooseCity}
          </a>`;
        popupEdit.innerHTML = `
          <a class="ol-popup-edit-a p-ripple p-button"
          style="border-radius:20px">
          ${editCity}
          </a>`;

        popupEdit.addEventListener('click', openEditCityModal);
        popupEdit.feature = feature;

        popupSubmit.addEventListener('click', () => {
          cityChoosen.emit(feature.values_.code);
        });
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

  newVectorLayer(cities: City[]) {
    this.appUtilsService.sortDataByValue(cities, 'averageTemperature');
    let features: Array<Feature<Point>> = [];
    let gradientColors = this.colorGradientService.generateColor('FF0000', '0000FF', cities.length);

    for (let index = 0; index < cities.length; index++) {
      const element: City = cities[index];
      const cityMarker = new Feature({
        geometry: new Point(olProj.fromLonLat([element.longitude, element.latitude])),
        name: element.name,
        code: element.code,
        latitude: element.latitude,
        longitude: element.longitude,
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

  initMap(
    cities: City[],
    popup: HTMLElement,
    popupContent: HTMLElement,
    popupCloser: HTMLElement,
    popupEdit: HTMLElement,
    popupSubmit: HTMLElement,
    cityChoosen: EventEmitter<number>,
    matDialog: MatDialog,
    citiesChange: EventEmitter<boolean>
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

      this.setMarkerClickEvents(
        map,
        popupContent,
        popupEdit,
        popupSubmit,
        overlay,
        cityChoosen,
        matDialog,
        citiesChange
      );
      this.setMarkerCursorPointer(map);

      resolve(map);
    });
  }
}
