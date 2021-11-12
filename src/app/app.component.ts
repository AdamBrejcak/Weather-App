import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInputService } from './core/user-input-service/user-input.service';
import { City } from './shared/city/city';
import { environment } from './../environments/environment';
import * as menuItems from '../app/shared/menuItems.json';
import { TranslatedMenuItem } from './shared/translated-menu-item/translated-menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  items: TranslatedMenuItem[] = (menuItems as any).default;
  showMenu: boolean = false;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private userInputService: UserInputService,
    private cdref: ChangeDetectorRef,
    private ngxTranslateService: TranslateService,
    private primeNgConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.ngxTranslateService.use(environment.defaultLanguage);

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      let itemsCopy: TranslatedMenuItem[] = JSON.parse(JSON.stringify(this.items));
      itemsCopy.forEach(
        (item: TranslatedMenuItem) => item.label = this.ngxTranslateService.instant('MAIN.MENU_ITEMS.' + item.translationLabel)
      );
      this.items = itemsCopy;
      this.primeNgConfig.setTranslation(this.ngxTranslateService.instant('API_INPUTS.CALENDAR'));
    });

    this.userInputService.currentCityValue
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((city: City | undefined) => {
        this.showMenu = !!city;
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  translateEN() {
    this.ngxTranslateService.use('en');
  }

  translateSK() {
    this.ngxTranslateService.use('sk');
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
