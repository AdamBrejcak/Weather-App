import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private cdref: ChangeDetectorRef,
    private ngxTranslateService: TranslateService,
    private primeNgConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.ngxTranslateService.use(environment.defaultLanguage);

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.primeNgConfig.setTranslation(this.ngxTranslateService.instant('API_INPUTS.CALENDAR'));
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
