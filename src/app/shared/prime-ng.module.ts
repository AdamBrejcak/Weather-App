import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// primeNG components
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { TabMenuModule } from 'primeng/tabmenu';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InputTextModule,
    SelectButtonModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    TabMenuModule,
  ],
})
export class PrimeNgModule {}
