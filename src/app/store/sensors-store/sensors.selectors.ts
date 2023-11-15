import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SensorsState } from './sensors.reducer';

const selectSensorsState = createFeatureSelector<SensorsState>('sensors');

export const selectIsAllSensorsLoading = createSelector(
  selectSensorsState,
  (state: SensorsState) => state.isAllSensorsLoading
);

export const selectAllSensors = createSelector(
  selectSensorsState,
  (state: SensorsState) => state.allSensors
);

export const selectSensorById = (sensorId: number) =>
  createSelector(selectAllSensors, (sensors) => {
    return sensors.find((sensor) => sensor.id === sensorId) || null;
  });

export const selectErrorMessage = createSelector(
  selectSensorsState,
  (state: SensorsState) => state.errorMessage
);
