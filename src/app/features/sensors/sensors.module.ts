import { CommonModule } from '@angular/common';
import { NgModule, OnInit } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthStoreFacade } from 'src/app/store/auth-store/auth-store.facade';
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
