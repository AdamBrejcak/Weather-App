import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from './../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private cdref: ChangeDetectorRef, private ngxTranslateService: TranslateService) {}

  ngOnInit() {
    this.ngxTranslateService.use(environment.defaultLanguage);
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
