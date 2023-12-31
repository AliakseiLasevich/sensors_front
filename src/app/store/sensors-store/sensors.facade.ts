import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SensorRequestInterface } from 'src/app/core/models/sensor.interfaces';
import {
  requestAllSensors,
  requestCreateSensor,
  requestDeleteSensor,
  requestUpdateSensor,
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

  updateSensor(sensor: SensorRequestInterface, id: number) {
    this.store.dispatch(requestUpdateSensor({ id, sensor }));
  }
  createSensor(sensor: SensorRequestInterface) {
    this.store.dispatch(requestCreateSensor({ sensor }));
  }
  deleteSensor(id: number) {
    this.store.dispatch(requestDeleteSensor({ id }));
  }
}
