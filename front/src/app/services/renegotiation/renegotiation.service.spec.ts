import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RenegotiationService } from './renegotiation.service';
import { AuthService } from '../auth/auth.service';

describe('RenegotiationService', () => {
  let service: RenegotiationService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RenegotiationService, AuthService]
    });

    service = TestBed.inject(RenegotiationService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add authorization header with token when calling getRenegotiations', () => {
    const dummyRenegotiations = [{ id: 1, status: 'pending' }, { id: 2, status: 'approved' }];
    const token = '12345';
    jest.spyOn(authService, 'token', 'get').mockReturnValue(token);

    service.getRenegotiations().subscribe(renegotiations => {
      expect(renegotiations).toEqual(dummyRenegotiations);
    });

    const req = httpMock.expectOne('http://localhost:3003/api/renegotiations');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(dummyRenegotiations);
  });

  it('should add authorization header without token when no token is available', () => {
    const dummyRenegotiations = [{ id: 1, status: 'pending' }, { id: 2, status: 'approved' }];
    jest.spyOn(authService, 'token', 'get').mockReturnValue(null);

    service.getRenegotiations().subscribe(renegotiations => {
      expect(renegotiations).toEqual(dummyRenegotiations);
    });

    const req = httpMock.expectOne('http://localhost:3003/api/renegotiations');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ');
    req.flush(dummyRenegotiations);
  });
});
