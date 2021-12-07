import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslatedMenuItem } from 'src/app/shared/translated-menu-item/translated-menu-item';
import { menuItems } from 'src/app/shared/menuItems';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-content-wmenu',
  templateUrl: './content-with-menu.component.html',
  styleUrls: ['./content-with-menu.component.scss'],
})
export class ContentWithMenuComponent implements OnInit {
  menuItems: TranslatedMenuItem[] = menuItems;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private ngxTranslateService: TranslateService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.menuItems.forEach((item: TranslatedMenuItem) => {
      item.label = this.ngxTranslateService.instant('MAIN.MENU_ITEMS.' + item.translationLabel);
      item = new TranslatedMenuItem(item);
    });

    this.route.params.pipe(takeUntil(this.componentDestroyed)).subscribe((params) => {
      this.menuItems.forEach((item: TranslatedMenuItem) => {
        let itemRouterLink = item.routerLink.split('/');
        item.routerLink = `/${itemRouterLink[1]}/${params.cityCode}/${params.dateFrom}/${params.dateTo}`;
      });
    });

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      let itemsCopy: TranslatedMenuItem[] = JSON.parse(JSON.stringify(this.menuItems));
      itemsCopy.forEach((item: TranslatedMenuItem) => {
        item.label = this.ngxTranslateService.instant('MAIN.MENU_ITEMS.' + item.translationLabel);
        item = new TranslatedMenuItem(item);
      });
      this.menuItems = itemsCopy;
    });
  }
}
