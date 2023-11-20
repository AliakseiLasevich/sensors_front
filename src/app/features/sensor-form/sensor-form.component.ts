import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { SensorType } from 'src/app/core/models/sensor-types';
import { SensorUnit } from 'src/app/core/models/sensor-unit';
import {
  SensorRequestInterface,
  SensorResponseInterface,
} from 'src/app/core/models/sensor.interfaces';
import { RangeValidator } from 'src/app/shared/validators/range-validator';
import { SensorsFacade } from 'src/app/store/sensors-store/sensors.facade';

@Component({
  selector: 'app-sensor-form',
  templateUrl: './sensor-form.component.html',
  styleUrls: ['./sensor-form.component.scss'],
})
export class SensorFormComponent implements OnInit {
  form: FormGroup;
  numericPattern: RegExp = /^-?\d*(\.\d+)?$/;
  types = SensorType;
  units = Object.entries(SensorUnit);

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private sensorsFacade: SensorsFacade,
    public dialogRef: MatDialogRef<SensorResponseInterface>,
    @Inject(MAT_DIALOG_DATA)
    public data: { sensor: SensorResponseInterface | null }
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.populateForm();
  }

  initializeForm() {
    this.form = this.formBuilder.group(
      {
        name: [null, [Validators.required, Validators.maxLength(30)]],
        model: [null, [Validators.required, Validators.maxLength(15)]],
        rangeFrom: [
          null,
          [Validators.required, Validators.pattern(this.numericPattern), ],
        ],
        rangeTo: [
          null,
          [Validators.required, Validators.pattern(this.numericPattern)],
        ],
        type: [null, [Validators.required]],
        unit: [null, [Validators.required]],
        location: [null, []],
        description: [null, []],
      }, {validators: RangeValidator.validator}
    );

  }

  populateForm() {
    const sensor = this.data.sensor;
    if (sensor) {
      this.form.patchValue({
        name: sensor.name,
        model: sensor.model,
        rangeFrom: sensor.rangeFrom,
        rangeTo: sensor.rangeTo,
        type: sensor.type,
        unit: sensor.unit,
        location: sensor.location,
        description: sensor.description,
      });
    }
  }

  onSubmit() {
    const request: SensorRequestInterface = {
      name: this.form.get('name')?.value,
      model: this.form.get('model')?.value,
      type: this.form.get('type')?.value,
      unit: this.form.get('unit')?.value,
      rangeFrom: this.form.get('rangeFrom')?.value,
      rangeTo: this.form.get('rangeTo')?.value,
      location: this.form.get('location')?.value,
      description: this.form.get('description')?.value,
    };

    if (this.form.valid && this.data.sensor?.id) {
      this.sensorsFacade.updateSensor(request, this.data.sensor.id);
    } else if (this.form.valid) {
      this.sensorsFacade.createSensor(request);
    }
  }

  errorMessage(controlName: string, maxLength?: number): string {
    const form: FormControl = this.form.get(controlName) as FormControl;
    return form.hasError('required')
      ? 'Input the' + controlName
      : form.hasError('maxlength')
      ? 'Max length is' + maxLength
      : form.hasError('rangeError')
      ? 'Range from should be less than range to.'
      : '';
  }
}
