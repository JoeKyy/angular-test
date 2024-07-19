import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = 'http://localhost:3001/api/auth';
  private registerUrl = 'http://localhost:3001/api/register';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(this.authUrl, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(this.registerUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  get loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  get token(): string | null {
    return localStorage.getItem('access_token');
  }
}
