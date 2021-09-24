export class City {
  name: string;
  code: number;
  latitude: number;
  longitude: number;

  constructor(data:any){
    this.name = data.name;
    this.code = data.code;
    this.latitude = data.latitude;
    this.longitude = data.longitude;
  }

}
