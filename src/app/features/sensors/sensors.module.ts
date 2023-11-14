import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SensorsComponent } from './sensors.component';

const routes: Route[] = [{ path: '', component: SensorsComponent }];

@NgModule({
  declarations: [SensorsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SensorsModule {}
