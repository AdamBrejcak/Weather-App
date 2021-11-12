import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperaturePipe',
})
export class temperaturePipe implements PipeTransform {
  transform(value: number, unit: string): string {
    if (value) {
      return `${value.toFixed(2)} ${unit} `;
    }
    return '';
  }
}
