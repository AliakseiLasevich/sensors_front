import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material/material.module';
import { SensorUnitPipe } from './sensor-unit-pipe/sensor-unit.pipe';

@NgModule({
  declarations: [NotFoundComponent, HeaderComponent, SensorUnitPipe],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent, SensorUnitPipe]
})
export class SharedModule {}
