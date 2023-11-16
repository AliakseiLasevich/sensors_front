import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { SensorResponseInterface } from 'src/app/core/models/sensor.interfaces';
import { SensorsFacade } from 'src/app/store/sensors-store/sensors.facade';

@Component({
  selector: 'app-sensors-table',
  templateUrl: './sensors-table.component.html',
  styleUrls: ['./sensors-table.component.scss'],
})
export class SensorsTableComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'model',
    'type',
    'range',
    'unit',
    'location',
    'description',
  ];
  dataSource: MatTableDataSource<SensorResponseInterface>;

  sensors: SensorResponseInterface[];
  sensors$: Observable<SensorResponseInterface[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.sensorsFacade.getAllSensors();
    this.sensors$ = this.sensorsFacade.allSensors$;
    this.sensors$.subscribe((sensors) => {
      this.dataSource = new MatTableDataSource(sensors);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  constructor(private sensorsFacade: SensorsFacade) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
