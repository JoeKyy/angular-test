import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RenegotiationModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class RenegotiationService {
  private renegotiationUrl = environment.renegotiationApiUrl;

  constructor(private http: HttpClient) { }

  getRenegotiations(): Observable<{ renegotiations: RenegotiationModel[] }> {
    return this.http.get<{ renegotiations: RenegotiationModel[] }>(`${this.renegotiationUrl}/renegotiations`);
  }
}
