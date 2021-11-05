import { FormGroup } from '@angular/forms';

export class CustomValidators {
  static temperatureValidator(formCtrlOne: any, formCtrlTwo: any): { [key: string]: any } {
    return (fg: FormGroup) => {
      const temperature = fg.controls[formCtrlOne];
      const unit = fg.controls[formCtrlTwo];

      if (!unit.value) {
        return;
      }

      let minTemperatureError: { [p: string]: () => boolean } = {
        Celsius: () => {
          return temperature.value < 26.7;
        },
        Fahrenheit: () => {
          return temperature.value < 80;
        },
      };

      if (minTemperatureError[unit.value]()) {
        temperature.setErrors({
          ...temperature.errors,
          ...{ temperature_min: true },
        });
      } else {
        let fieldOneError: any = { ...temperature.errors };
        delete fieldOneError['temperature_min'];
        fieldOneError = Object.keys(fieldOneError).length > 0 ? fieldOneError : null;
        temperature.setErrors(fieldOneError);
      }
    };
  }
}
