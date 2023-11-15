import { createReducer, on } from '@ngrx/store';
import { SensorResponseInterface } from 'src/app/core/models/sensor.interfaces';
import {
  requestAllSensors,
  requestAllSensorsFailure,
  requestAllSensorsSuccess,
  requestCreateSensor,
  requestCreateSensorFailure,
  requestCreateSensorSuccess,
  requestDeleteSensor,
  requestDeleteSensorFailure,
  requestDeleteSensorSuccess,
  requestEditSensor,
  requestEditSensorFailure,
  requestEditSensorSuccess,
} from './sensors.actions';

export const sensorsFeatureKey = 'sensors';

export interface SensorsState {
  allSensors: SensorResponseInterface[];
  isAllSensorsLoading: boolean;
  errorMessage: string | null;
}

export const initialState: SensorsState = {
  allSensors: [],
  isAllSensorsLoading: false,
  errorMessage: null,
};

export const sensorsReducer = createReducer(
  initialState,

  // GET ALL SENSORS
  on(requestAllSensors, (state) => ({ ...state, isAllSensorsLoading: true })),
  on(requestAllSensorsSuccess, (state, { response }) => {
    return {
      ...state,
      isAllSensorsLoading: false,
      allSensors: response,
    };
  }),
  on(requestAllSensorsFailure, (state, { error }) => ({
    ...state,
    isAllSensorsLoading: false,
    errorMessage: error,
  })),

  // CREATE SENSOR
  on(requestCreateSensor, (state) => ({
    ...state,
    isSingleSensorLoading: true,
  })),
  on(requestCreateSensorSuccess, (state, { response }) => {
    return {
      ...state,
      isSingleSensorLoading: false,
      sensor: response,
    };
  }),
  on(requestCreateSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  })),
  
  // EDIT SENSOR
  on(requestEditSensor, (state) => ({ ...state, isSingleSensorLoading: true })),
  on(requestEditSensorSuccess, (state, { response }) => {
    return {
      ...state,
      isSingleSensorLoading: false,
      sensor: response,
    };
  }),
  on(requestEditSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  })),

  // DELETE SENSOR
  on(requestDeleteSensor, (state) => ({
    ...state,
    isSingleSensorLoading: true,
  })),
  on(requestDeleteSensorSuccess, (state, { response }) => {
    return {
      ...state,
      isSingleSensorLoading: false,
    };
  }),
  on(requestDeleteSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  })),
);
