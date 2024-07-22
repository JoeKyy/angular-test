import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.authApiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/auth`, { username, password });
  }

  register(username: string, password: string): Observable<any> {

    return this.http.post(`${this.apiUrl}/register`, { username, password });
  }

  getToken(clientId: string, clientSecret: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/token`, { clientId, clientSecret });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenFromStorage(): string {
    return localStorage.getItem('token') || '';
  }
}
