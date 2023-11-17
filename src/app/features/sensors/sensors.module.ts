import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SensorFormComponent } from '../sensor-form/sensor-form.component';
import { SensorsTableComponent } from '../sensors-table/sensors-table.component';
import { SensorsComponent } from './sensors.component';

import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [{ path: '', component: SensorsComponent }];

@NgModule({
  declarations: [SensorsComponent, SensorsTableComponent, SensorFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
  ],
})
export class SensorsModule {}
