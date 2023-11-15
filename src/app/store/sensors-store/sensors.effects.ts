import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import {
  requestAllSensorsFailure,
  requestAllSensorsSuccess,
  requestCreateSensorFailure,
  requestCreateSensorSuccess,
  requestDeleteSensorFailure,
  requestDeleteSensorSuccess,
  requestEditSensorFailure,
  requestEditSensorSuccess,
} from './sensors.actions';
import { SensorsConstants } from './sensors.constants';
import { SensorsService } from 'src/app/services/sensors.service';

@Injectable({ providedIn: 'root' })
export class SensorsEffects {
  constructor(
    private actions$: Actions,
    private sensorsService: SensorsService,
    private router: Router
  ) {}

  getAllSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsConstants.REQUEST_ALL_SENSORS),
      switchMap(() => {
        return this.sensorsService.getAllSensors().pipe(
          map((response) => requestAllSensorsSuccess({ response })),
          catchError((error) => {
            return of(requestAllSensorsFailure(error));
          })
        );
      })
    )
  );

  deleteSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsConstants.REQUEST_DELETE_SENSOR),
      switchMap(({ id }) => {
        return this.sensorsService.deleteSensor(id).pipe(
          map((response) => requestDeleteSensorSuccess({ response })),
          catchError((error) => {
            return of(requestDeleteSensorFailure(error));
          })
        );
      })
    )
  );

  editSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsConstants.REQUEST_EDIT_SENSOR),
      switchMap(({ id, sensor }) => {
        return this.sensorsService.editSensor(id, sensor).pipe(
          map((response) => requestEditSensorSuccess({ response })),
          catchError((error) => {
            return of(requestEditSensorFailure(error));
          })
        );
      })
    )
  );

  createSensor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SensorsConstants.REQUEST_CREATE_SENSOR),
      switchMap(({ sensor }) => {
        return this.sensorsService.createSensor(sensor).pipe(
          map((response) => requestCreateSensorSuccess({ response })),
          catchError((error) => {
            return of(requestCreateSensorFailure(error));
          })
        );
      })
    )
  );

  //   redirectToTheSensorsPage$ = createEffect(
  //     () =>
  //       this.actions$.pipe(
  //         ofType(
  //           SensorsConstants.REQUEST_CREATE_SENSOR_SUCCESS,
  //           SensorsConstants.REQUEST_EDIT_SENSOR_SUCCESS,
  //           SensorsConstants.REQUEST_SINGLE_SENSOR_FAIL
  //         ),
  //         map(() => {
  //           this.router.navigate(['/']);
  //         })
  //       ),
  //     { dispatch: false }
  //   );
  // }

  // function requestFilterSuccess(arg0: {
  //   sensors: import('../../features/sensors/model/sensor.interfaces').SensorResponse[];
  // }): any {
  //   throw new Error('Function not implemented.');
  // }

  // function requestFilterFailure(error: any): any {
  //   throw new Error('Function not implemented.');
}
