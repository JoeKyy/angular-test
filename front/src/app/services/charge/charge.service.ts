import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private chargeUrl = 'http://localhost:3002/api/charges';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCharges(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.token ? this.authService.token : ''}`);
    return this.http.get(this.chargeUrl, { headers });
  }
}
