import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login successfully', () => {
    const mockResponse = { token: 'mockToken' };
    service.login('test', 'password').subscribe(response => {
      expect(response.token).toBe('mockToken');
    });

    const req = httpMock.expectOne(`${environment.authApiUrl}/auth`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Client-Credentials')).toBe(`${environment.clientId}:${environment.clientSecret}`);
    req.flush(mockResponse);
  });
});
