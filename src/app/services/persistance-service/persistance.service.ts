import { Injectable } from '@angular/core';
import { AuthResponseInterface } from 'src/app/core/models/auth.interfaces';

@Injectable({ providedIn: 'root' })
export class PersistanceService {
  set(key: string, data: string): void {
    try {
      localStorage.setItem(key, data);
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  get(key: string): string {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return '';
      }
      return item;
    } catch (e) {
      console.error('Error getting data from the localStorage', e);
      return '';
    }
  }

  delete(key: string) {
    localStorage.removeItem(key);
  }

  storeToken(response: AuthResponseInterface) {
    this.set('token', response.access_token.token);
    this.set('token_expiresIn', response.access_token.expires_in.toString());
  }
}
