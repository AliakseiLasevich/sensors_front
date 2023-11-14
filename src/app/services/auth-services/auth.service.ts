import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, shareReplay } from 'rxjs';
import {
  AuthRequestInterface,
  AuthResponseInterface,
} from '../../core/models/auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(data: AuthRequestInterface): Observable<AuthResponseInterface> {
    const url = environment.apiUrl + '/auth/authenticate';
    return this.http.post<AuthResponseInterface>(url, data).pipe(shareReplay());
  }
}
