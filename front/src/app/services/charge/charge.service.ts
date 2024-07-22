import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private chargeUrl = environment.chargeApiUrl;

  constructor(private http: HttpClient) { }

  getCharges(): Observable<any> {
    return this.http.get(`${this.chargeUrl}/charges`);
  }
}
