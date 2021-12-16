import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageModule } from 'primeng/image';
import { TabMenuModule } from 'primeng/tabmenu';
import { ContentWithMenuComponent } from './core/content-with-menu/content-with-menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPermissionsModule } from 'ngx-permissions';
import { UserEditDialogComponent } from './core/user-edit-dialog-component/user-edit-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { RippleModule } from 'primeng/ripple';
import { ContentWithHeadingComponent } from './core/content-with-heading/content-with-heading.component';

export function translationsLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/translations/', '.json');
}

@NgModule({
  declarations: [AppComponent, ContentWithMenuComponent, ContentWithHeadingComponent, UserEditDialogComponent],
  imports: [
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    BrowserModule,
    ReactiveFormsModule,
    ImageModule,
    TabMenuModule,
    MatProgressSpinnerModule,
    ButtonModule,
    InputTextModule,
    MenuModule,
    RippleModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: translationsLoaderFactory,
        deps: [HttpClient],
      },
      isolate: true,
    }),
    NgxPermissionsModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
