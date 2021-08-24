export class City {
  name: string;
  code: number;

  constructor(data:any){
    this.name = data.name;
    this.code = data.code;
  }

}
