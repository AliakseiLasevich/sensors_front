import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SensorsTableComponent } from '../sensors-table/sensors-table.component';
import { SensorsComponent } from './sensors.component';

const routes: Route[] = [{ path: '', component: SensorsComponent }];

@NgModule({
  declarations: [SensorsComponent, SensorsTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule.forChild(routes),
  ],
})
export class SensorsModule {}
