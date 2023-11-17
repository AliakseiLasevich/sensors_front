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
export const requestUpdateSensor = createAction(
  SensorsConstants.REQUEST_UPDATE_SENSOR,
  props<{ id: number; sensor: SensorRequestInterface }>()
);
export const requestUpdateSensorSuccess = createAction(
  SensorsConstants.REQUEST_UPDATE_SENSOR_SUCCESS,
  props<{ response: SensorResponseInterface }>()
);
export const requestUpdateSensorFailure = createAction(
  SensorsConstants.REQUEST_UPDATE_SENSOR_FAIL,
  props<{ error: string }>()
);

// DELETE SENSOR
export const requestDeleteSensor = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR,
  props<{ id: number }>()
);
export const requestDeleteSensorSuccess = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR_SUCCESS,
  props<{ id: number }>()
);
export const requestDeleteSensorFailure = createAction(
  SensorsConstants.REQUEST_DELETE_SENSOR_FAIL,
  props<{ error: string }>()
);
