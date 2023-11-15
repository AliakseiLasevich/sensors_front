import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SensorRequestInterface } from 'src/app/core/models/sensor.interfaces';
import {
  requestAllSensors,
  requestCreateSensor,
  requestDeleteSensor,
  requestEditSensor,
} from './sensors.actions';
import { SensorsState } from './sensors.reducer';
import {
  selectAllSensors,
  selectErrorMessage,
  selectIsAllSensorsLoading,
  selectSensorById,
} from './sensors.selectors';

@Injectable({
  providedIn: 'root',
})
export class SensorsFacade {
  constructor(private store: Store<SensorsState>) {}

  isAllSensorsLoading$ = this.store.pipe(select(selectIsAllSensorsLoading));
  allSensors$ = this.store.pipe(select(selectAllSensors));
  errorMessage$ = this.store.pipe(select(selectErrorMessage));

  getAllSensors() {
    this.store.dispatch(requestAllSensors());
  }
  getSensorById(id: number) {
    this.store.pipe(select(selectSensorById(id)));
  }

  editSensor(sensor: SensorRequestInterface, id: string) {
    this.store.dispatch(requestEditSensor({ id, sensor }));
  }
  createSensor(sensor: SensorRequestInterface) {
    this.store.dispatch(requestCreateSensor({ sensor }));
  }
  deleteSensor(id: string) {
    this.store.dispatch(requestDeleteSensor({ id }));
  }
}
