import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

import { Observable } from 'rxjs';
import { SensorRequestInterface, SensorResponseInterface } from '../core/models/sensor.interfaces';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  url: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllSensors(): Observable<SensorResponseInterface[]> {
    return this.http.get<SensorResponseInterface[]>(
      `${this.url}/sensors`
    );
  }

  createSensor(
    sensor: SensorRequestInterface
  ): Observable<SensorResponseInterface> {
    return this.http.post<SensorResponseInterface>(
      `${this.url}/sensors/add`,
      sensor
    );
  }

  editSensor(
    id: string,
    sensor: SensorRequestInterface
  ): Observable<SensorResponseInterface> {
    const url = `${this.url}/sensors/${id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.put<SensorResponseInterface>(url, sensor, {
      headers,
    });
  }

  getSensor(id: string): Observable<SensorResponseInterface> {
    const url = `${this.url}/sensors/${id}`;
    return this.http.get<SensorResponseInterface>(url);
  }

  deleteSensor(id: string) {
    const url = `${this.url}/sensors/${id}`;
    return this.http.delete<string>(url);
  }

}
