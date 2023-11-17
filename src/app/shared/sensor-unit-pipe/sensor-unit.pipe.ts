import { Pipe, PipeTransform } from '@angular/core';
import { SensorUnit } from 'src/app/core/models/sensor-unit';

@Pipe({
  name: 'sensorUnit',
})
export class SensorUnitPipe implements PipeTransform {
  transform(value: string): string {
    const enumObject: Record<string, string> = SensorUnit;
    return enumObject[value] || '';
  }
}
