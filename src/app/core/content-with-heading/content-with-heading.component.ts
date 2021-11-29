import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxRolesService } from 'ngx-permissions';
import { PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication-service/authentication.service';

@Component({
  selector: 'app-content-with-heading',
  templateUrl: './content-with-heading.component.html',
  styleUrls: ['./content-with-heading.component.scss']
})
export class ContentWithHeadingComponent implements OnInit {

  loggedIn!: boolean;
  private componentDestroyed: Subject<void> = new Subject<void>();


  constructor(
    private ngxTranslateService: TranslateService,
    private primeNgConfig: PrimeNGConfig,
    private ngxRolesService: NgxRolesService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.primeNgConfig.setTranslation(this.ngxTranslateService.instant('API_INPUTS.CALENDAR'));
    });

    this.authenticationService.userLogged.subscribe((res: boolean) => {
      this.loggedIn = res;
      if (res) {
        this.ngxRolesService.addRoleWithPermissions('ADMIN', ['canEditCityNote']);
      } else {
        this.ngxRolesService.flushRolesAndPermissions();
      }
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


  logOut() {
    this.authenticationService.logoutUser();
  }
}
