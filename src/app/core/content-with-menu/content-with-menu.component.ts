import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TranslatedMenuItem } from 'src/app/shared/translated-menu-item/translated-menu-item';
import { menuItems } from 'src/app/shared/menuItems';

@Component({
  selector: 'app-content-wmenu',
  templateUrl: './content-with-menu.component.html',
  styleUrls: ['./content-with-menu.component.scss'],
})
export class ContentWithMenuComponent implements OnInit {
  items: TranslatedMenuItem[] = menuItems;

  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private ngxTranslateService: TranslateService) {}

  ngOnInit(): void {
    this.items.forEach((item: TranslatedMenuItem) => {
      item.label = this.ngxTranslateService.instant('MAIN.MENU_ITEMS.' + item.translationLabel);
      item = new TranslatedMenuItem(item);
    });

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      let itemsCopy: TranslatedMenuItem[] = JSON.parse(JSON.stringify(this.items));
      itemsCopy.forEach((item: TranslatedMenuItem) => {
        item.label = this.ngxTranslateService.instant('MAIN.MENU_ITEMS.' + item.translationLabel);
        item = new TranslatedMenuItem(item);
      });
      this.items = itemsCopy;
    });
  }
}
