import { TemperaturePipe } from './temperature.pipe';

describe('WeatherDataUnitsPipe', () => {
  it('create an instance', () => {
    const pipe = new TemperaturePipe();
    expect(pipe).toBeTruthy();
  });
});
