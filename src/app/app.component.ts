import { Component, OnDestroy, OnInit, ChangeDetectorRef } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserInputService } from './core/user-input-service/user-input.service';
import { City } from './shared/city/city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  items: MenuItem[] = [];
  showMenu: boolean = false;
  private componentDestroyed: Subject<void> = new Subject<void>();

  constructor(private userInputService: UserInputService, private cdref: ChangeDetectorRef) {}

  ngOnInit() {
    this.userInputService.currentCityValue
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((city: City | undefined) => {
        this.showMenu = !!city;
      });

    this.items = [
      {
        label: 'Weather Table',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'weathertable',
      },
      {
        label: 'Line Chart',
        icon: 'pi pi-chart-line',
        routerLink: 'linechart',
      },
      {
        label: 'Heat Index Calculator',
        icon: 'pi pi-sun',
        routerLink: 'heatindex',
      },
    ];
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  ngAfterContentChecked() {
    this.cdref.detectChanges();
  }
}
