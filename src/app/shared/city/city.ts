export class City {
  name: string;
  translationName: string;
  code: number;
  latitude: number;
  longitude: number;
  note: string;
  averageTemperature?:number;

  constructor(data: any) {
    this.name = data.name;
    this.translationName = data.translationName;
    this.code = data.code;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.note = data.note;
    this.averageTemperature = data.averageTemperature;
  }
}
