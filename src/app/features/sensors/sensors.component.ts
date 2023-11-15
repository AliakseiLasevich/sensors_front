import { Component, OnInit } from '@angular/core';
import { SensorsFacade } from 'src/app/store/sensors-store/sensors.facade';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss'],
})
export class SensorsComponent implements OnInit {
  constructor(private sensorsFacade: SensorsFacade) {}

  ngOnInit(): void {
    this.sensorsFacade.getAllSensors();
  }
  
}
