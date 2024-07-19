import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return a token', () => {
    const dummyResponse = { token: '12345' };
    const username = 'testuser';
    const password = 'password';

    service.login(username, password).subscribe(response => {
      expect(response.token).toBe(dummyResponse.token);
    });

    const req = httpMock.expectOne('http://localhost:3001/api/auth');
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should logout and remove the token from localStorage', () => {
    localStorage.setItem('access_token', '12345');
    service.logout();
    expect(localStorage.getItem('access_token')).toBeNull();
  });

  it('should return true for loggedIn if token exists', () => {
    localStorage.setItem('access_token', '12345');
    expect(service.loggedIn).toBeTruthy();
  });

  it('should return false for loggedIn if no token exists', () => {
    localStorage.removeItem('access_token');
    expect(service.loggedIn).toBeFalsy();
  });

  it('should return the token from localStorage', () => {
    localStorage.setItem('access_token', '12345');
    expect(service.token).toBe('12345');
  });

  it('should return null for token if no token exists in localStorage', () => {
    localStorage.removeItem('access_token');
    expect(service.token).toBeNull();
  });
});
