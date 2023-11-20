import { AbstractControl, ValidationErrors } from '@angular/forms';

export class RangeValidator {

  static validator(control: AbstractControl): ValidationErrors | null {
    const rangeFrom = control.get('rangeFrom')?.value;
    const rangeTo = control.get('rangeTo')?.value;

    if (rangeFrom !== null && rangeTo !== null && rangeFrom >= rangeTo) {
        control.get('rangeFrom')!.setErrors({validator:true})
        control.get('rangeTo')!.setErrors({validator:true})
      return { rangeError: true };
    }

    control.get('rangeFrom')!.setErrors(null)
    control.get('rangeTo')!.setErrors(null)
    return null;
  }
}
