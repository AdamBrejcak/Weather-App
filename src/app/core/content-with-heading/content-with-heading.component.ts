import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NgxRolesService } from 'ngx-permissions';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '../authentication-service/authentication.service';
import { UserEditDialogComponent } from '../user-edit-dialog-component/user-edit-dialog.component';

@Component({
  selector: 'app-content-with-heading',
  templateUrl: './content-with-heading.component.html',
  styleUrls: ['./content-with-heading.component.scss'],
})
export class ContentWithHeadingComponent implements OnInit {
  user!: any;
  onLoginPage!: boolean;
  userItems!: MenuItem[];
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(
    private ngxTranslateService: TranslateService,
    private primeNgConfig: PrimeNGConfig,
    private ngxRolesService: NgxRolesService,
    private authenticationService: AuthenticationService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.reloadUserMenu();

    this.ngxTranslateService.onLangChange.pipe(takeUntil(this.componentDestroyed)).subscribe(() => {
      this.primeNgConfig.setTranslation(this.ngxTranslateService.instant('API_INPUTS.CALENDAR'));
      this.reloadUserMenu();
    });

    this.authenticationService.userLogged.subscribe((res: any) => {
      this.user = res;
      if (res.loggedIn) {
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

  onUserEditClick() {
    const dialogRef = this.matDialog.open(UserEditDialogComponent, {
      width: '300px',
      data: this.user,
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: boolean) => {
        if (res) {
          this.reloadUserMenu();
        }
      });
  }

  reloadUserMenu() {
    this.userItems = [
      {
        label: `${this.ngxTranslateService.instant('LOGIN.EDIT')}`,
        icon: 'pi pi-pencil',
        command: () => {
          this.onUserEditClick();
        },
      },
      {
        label: `${this.ngxTranslateService.instant('LOGIN.LOGOUT')}`,
        icon: 'pi pi-sign-out',
        command: () => {
          this.authenticationService.logoutUser();
        },
      },
    ];
  }

  logOut() {
    this.authenticationService.logoutUser();
  }
}
