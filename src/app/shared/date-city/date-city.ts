import { City } from "../city/city";

export class DateCity {
    date: Date;
    city: City|undefined;

    constructor(date: Date, city: City|undefined,){
      this.date = date;
      this.city = city;
  }

}
