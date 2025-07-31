import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
/**
 * AuthService manages authentication state and communication with the backend API for login and registration.
 */
export class AuthService {
  private readonly API_URL = '/api';

  constructor(http: HttpClient, @Inject(PLATFORM_ID) platformId: Object) {
    this._http = http;
    this._platformId = platformId;
  }
  private _http: HttpClient;
  private _platformId: Object;

  // Helper guard for localStorage (never directly use window in SSR/lint)
  private safeLocalStorage(): Storage | null {
    if (isPlatformBrowser(this._platformId)) {
      // eslint-disable-next-line no-undef
      return typeof window !== 'undefined' ? window.localStorage : null;
    }
    return null;
  }

  // PUBLIC_INTERFACE
  async login(username: string, password: string): Promise<any> {
    const resp = await this._http.post(`${this.API_URL}/login`, { username, password }).toPromise();
    this.safeLocalStorage()?.setItem('token', (resp as any)?.token || '');
    return resp;
  }

  // PUBLIC_INTERFACE
  async register(username: string, password: string): Promise<any> {
    return this._http.post(`${this.API_URL}/register`, { username, password }).toPromise();
  }

  // PUBLIC_INTERFACE
  logout() {
    this.safeLocalStorage()?.removeItem('token');
  }

  // PUBLIC_INTERFACE
  isLoggedIn(): boolean {
    return !!this.safeLocalStorage()?.getItem('token');
  }
}
