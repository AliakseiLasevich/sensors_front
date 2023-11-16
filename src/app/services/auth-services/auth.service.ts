import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';
import {
  EMPTY,
  Observable,
  map,
  of,
  shareReplay,
  throwError,
  switchMap,
} from 'rxjs';
import {
  AuthRequestInterface,
  AuthResponseInterface,
} from '../../core/models/auth.interfaces';
import { PersistanceService } from '../persistance-service/persistance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private persistanceService: PersistanceService
  ) {}

  authenticate(data: AuthRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/auth/authenticate';
    return this.http.post<AuthResponseInterface>(url, data).pipe(shareReplay());
  }

  logout(): Observable<number> {
    const headers = this.getAuthHeaders();
    return this.http
      .post(`${environment.apiUrl}/logout`, {
        headers: headers,
      })
      .pipe(switchMap(() => of(200)));
  }

  public getAuthHeaders(): HttpHeaders | null {
    const token = this.persistanceService.get('token');
    if (token) {
      const headers = new HttpHeaders({
        Authorization: token,
      });
      return headers;
    }
    return null;
  }
}
