import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RenegotiationService {
  private renegotiationUrl = 'http://localhost:3003/api/renegotiations';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getRenegotiations(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token ? this.authService.token : ''}`);
    return this.http.get(this.renegotiationUrl, { headers });
  }
}
