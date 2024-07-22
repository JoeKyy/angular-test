import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = req.headers.set('Content-Type', 'application/json');

    const token = this.authService.getTokenFromStorage();
    const clientId = environment.clientId;
    const clientSecret = environment.clientSecret;

    const authRequiredUrls = [
      environment.chargeApiUrl,
      environment.renegotiationApiUrl
    ];

    const isAuthUrl = [
      environment.authApiUrl
    ];

    const authRequired = authRequiredUrls.some(url => req.url.startsWith(url));

    if (authRequired) {
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }

    if (isAuthUrl) {
      if (clientId && clientSecret) {
        headers = headers.set('Client-Credentials', `${clientId}:${clientSecret}`);
      }
    }

    const clonedReq = req.clone({ headers });
    return next.handle(clonedReq);
  }
}
