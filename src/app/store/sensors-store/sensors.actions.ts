import { createAction, props } from '@ngrx/store';
import {
  SensorRequestInterface,
  SensorResponseInterface,
} from 'src/app/core/models/sensor.interfaces';
import { SensorsConstants } from './sensors.constants';

// GET ALL SENSORS
export const requestAllSensors = createAction(
  SensorsConstants.REQUEST_ALL_SENSORS
);
export const requestAllSensorsSuccess = createAction(
  SensorsConstants.REQUEST_ALL_SENSORS_SUCCESS,
  props<{ response: SensorResponseInterface[] }>()
);
export const requestAllSensorsFailure = createAction(
  SensorsConstants.REQUEST_ALL_SENSORS_FAIL,
  props<{ error: string }>()
);

// CREATE SENSOR
export const requestCreateSensor = createAction(
  SensorsConstants.REQUEST_CREATE_SENSOR,
  props<{ sensor: SensorRequestInterface }>()
);
export const requestCreateSensorSuccess = createAction(
  SensorsConstants.REQUEST_CREATE_SENSOR_SUCCESS,
  props<{ response: SensorResponseInterface }>()
);
export const requestCreateSensorFailure = createAction(
  SensorsConstants.REQUEST_CREATE_SENSOR_FAIL,
  props<{ error: string }>()
);

// EDIT SENSOR
export const requestEditSensor = createAction(
  SensorsConstants.REQUEST_EDIT_SENSOR,
  props<{ id: string; sensor: SensorRequestInterface }>()
);
export const requestEditSensorSuccess = createAction(
  SensorsConstants.REQUEST_EDIT_SENSOR_SUCCESS,
  props<{ response: SensorResponseInterface }>()
);
export const requestEditSensorFailure = createAction(
  SensorsConstants.REQUEST_EDIT_SENSOR_FAIL,
  props<{ error: string }>()
);

// DELETE SENSOR
export const requestDeleteSensor = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR,
  props<{ id: number }>()
);
export const requestDeleteSensorSuccess = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR_SUCCESS,
  props<{ id : number }>()
);
export const requestDeleteSensorFailure = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR_FAIL,
  props<{ error: string }>()
);