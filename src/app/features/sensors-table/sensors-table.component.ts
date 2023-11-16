import { Subscription } from 'rxjs';
import { Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SensorResponseInterface } from 'src/app/core/models/sensor.interfaces';
import { SensorsFacade } from 'src/app/store/sensors-store/sensors.facade';

@Component({
  selector: 'app-sensors-table',
  templateUrl: './sensors-table.component.html',
  styleUrls: ['./sensors-table.component.scss'],
})
export class SensorsTableComponent implements OnInit, OnDestroy {
  @Input() isEditable: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<SensorResponseInterface>;
  displayedColumns: string[];
  subscriptions: Subscription[] = [];

  constructor(private sensorsFacade: SensorsFacade) {}

  ngOnInit(): void {
    this.sensorsFacade.getAllSensors();
    const sensorsSubsctiption = this.sensorsFacade.allSensors$.subscribe(
      (sensors) => {
        this.dataSource = new MatTableDataSource(sensors);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
    this.subscriptions.push(sensorsSubsctiption);

    this.displayedColumns = [
      'name',
      'model',
      'type',
      'range',
      'unit',
      'location',
      'description',
    ];

    if (this.isEditable) {
      this.displayedColumns.push('tools');
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

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
