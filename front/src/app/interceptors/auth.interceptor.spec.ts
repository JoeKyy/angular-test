import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthService } from '../services/auth/auth.service';
import { environment } from '../../environments/environment';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let authService: AuthService;

  const mockAuthService = {
    getTokenFromStorage: jest.fn()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: AuthService, useValue: mockAuthService }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Content-Type header to all requests', () => {
    httpClient.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
  });

  it('should add Authorization header when token is available for auth required URLs', () => {
    mockAuthService.getTokenFromStorage.mockReturnValue('mockToken');

    httpClient.get(`${environment.chargeApiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.chargeApiUrl}/test`);
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
  });

  it('should not add Authorization header when token is not available for auth required URLs', () => {
    mockAuthService.getTokenFromStorage.mockReturnValue(null);

    httpClient.get(`${environment.chargeApiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.chargeApiUrl}/test`);
    expect(req.request.headers.get('Authorization')).toBeNull();
  });

  it('should add Client-Credentials header when clientId and clientSecret are available for auth URL', () => {
    httpClient.get(`${environment.authApiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.authApiUrl}/test`);
    expect(req.request.headers.get('Client-Credentials')).toBe(`${environment.clientId}:${environment.clientSecret}`);
  });

  it('should not add Client-Credentials header when clientId and clientSecret are not available', () => {
    environment.clientId = '';
    environment.clientSecret = '';

    httpClient.get(`${environment.authApiUrl}/test`).subscribe();

    const req = httpMock.expectOne(`${environment.authApiUrl}/test`);
    expect(req.request.headers.get('Client-Credentials')).toBeNull();
  });

  it('should not add Authorization header to non-auth-required URLs', () => {
    mockAuthService.getTokenFromStorage.mockReturnValue('mockToken');

    httpClient.get('/non-auth-url').subscribe();

    const req = httpMock.expectOne('/non-auth-url');
    expect(req.request.headers.get('Authorization')).toBeNull();
  });
});
