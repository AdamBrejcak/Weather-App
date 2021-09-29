import { City } from '../city/city';

export class UserInputs {
  city: City | undefined;
  dates: {
    dateFrom: Date;
    dateTo: Date;
  };

  constructor(data: any) {
    this.city = data.city;
    this.dates = {
      dateFrom: data.dates.dateFrom,
      dateTo: data.dates.dateTo,
    };
  }
}
