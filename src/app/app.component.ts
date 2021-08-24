import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pantheon-zadanie-angular';
  items: MenuItem[] = [];

  constructor() {}

  ngOnInit() {
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

}
