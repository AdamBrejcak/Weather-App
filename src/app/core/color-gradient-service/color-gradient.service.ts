import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorGradientService {
  constructor() {}

  private hexColor(rgbColor: any): string {
    let str = '0123456789abcdef';
    let int = parseInt(rgbColor);
    if (int == 0 || isNaN(rgbColor)) return '00';
    int = Math.round(Math.min(Math.max(0, int), 255));
    return str.charAt((int - (int % 16)) / 16) + str.charAt(int % 16);
  }

  /* Convert an RGB triplet to a hex string */
  private convertToHex(rgbColor: any): string {
    return `#${this.hexColor(rgbColor[0]) + this.hexColor(rgbColor[1]) + this.hexColor(rgbColor[2])}`;
  }

  /* Convert a hex string to an RGB triplet */
  private convertToRGB(hexColor: any): number[] {
    let rgbColor = [];
    rgbColor[0] = parseInt(hexColor.substring(0, 2), 16);
    rgbColor[1] = parseInt(hexColor.substring(2, 4), 16);
    rgbColor[2] = parseInt(hexColor.substring(4, 6), 16);

    return rgbColor;
  }

  generateColor(colorStart: any, colorEnd: any, colorCount: any): string[] {
    // The beginning of gradient
    let start = this.convertToRGB(colorStart);
    // The end of gradient
    let end = this.convertToRGB(colorEnd);
    // The number of colors to compute
    let length = colorCount;
    //Alpha blending amount
    let alpha = 0.0;

    let colors = [];

    for (let i = 0; i < length; i++) {
      let color = [];
      alpha += 1.0 / length;

      color[0] = start[0] * alpha + (1 - alpha) * end[0];
      color[1] = start[1] * alpha + (1 - alpha) * end[1];
      color[2] = start[2] * alpha + (1 - alpha) * end[2];

      colors.push(this.convertToHex(color));
    }
    return colors;
  }
}
