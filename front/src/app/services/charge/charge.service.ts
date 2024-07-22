import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ChargeModel } from '../../models/charge.model';

@Injectable({
  providedIn: 'root'
})
export class ChargeService {
  private chargeUrl = environment.chargeApiUrl;

  constructor(private http: HttpClient) { }

  getCharges(): Observable<{ charges: ChargeModel[] }> {
    return this.http.get<{ charges: ChargeModel[] }>(`${this.chargeUrl}/charges`);
  }
}
