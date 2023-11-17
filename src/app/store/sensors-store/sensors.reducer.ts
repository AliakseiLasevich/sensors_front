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
  requestUpdateSensor,
  requestUpdateSensorFailure,
  requestUpdateSensorSuccess,
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
      allSensors: [...state.allSensors, response],
    };
  }),
  on(requestCreateSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  })),

  // UPDATE SENSOR
  on(requestUpdateSensor, (state) => ({
    ...state,
    isSingleSensorLoading: true,
  })),
  on(requestUpdateSensorSuccess, (state, { response }) => {
    const updatedSensors = state.allSensors.map((sensor) => {
      if (sensor.id === response.id) {
        return response;
      }
      return sensor;
    });
    return {
      ...state,
      isSingleSensorLoading: false,
      allSensors: updatedSensors,
    };
  }),
  on(requestUpdateSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  })),

  // DELETE SENSOR
  on(requestDeleteSensor, (state) => ({
    ...state,
    isSingleSensorLoading: true,
  })),
  on(requestDeleteSensorSuccess, (state, { id }) => {
    const filteredSensors = state.allSensors.filter(
      (sensor) => sensor.id !== id
    );
    return {
      ...state,
      allSensors: filteredSensors,
      isSingleSensorLoading: false,
    };
  }),
  on(requestDeleteSensorFailure, (state, { error }) => ({
    ...state,
    isSingleSensorLoading: false,
    errorMessage: error,
  }))
);
