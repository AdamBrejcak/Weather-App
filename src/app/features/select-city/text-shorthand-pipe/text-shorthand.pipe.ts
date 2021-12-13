import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textShorthand',
})
export class TextShorthandPipe implements PipeTransform {
  transform(text: string, cutLength: number): string {
    if (text.length > cutLength) {
      return text.slice(0, cutLength) + '...';
    }
    return text;
  }
}
