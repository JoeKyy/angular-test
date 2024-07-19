import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChargeService } from './charge.service';
import { AuthService } from '../auth/auth.service';

describe('ChargeService', () => {
  let service: ChargeService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChargeService, AuthService]
    });

    service = TestBed.inject(ChargeService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add authorization header with token when calling getCharges', () => {
    const dummyCharges = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
    const token = '12345';
    jest.spyOn(authService, 'token', 'get').mockReturnValue(token);

    service.getCharges().subscribe(charges => {
      expect(charges).toEqual(dummyCharges);
    });

    const req = httpMock.expectOne('http://localhost:3002/api/charges');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(dummyCharges);
  });

  it('should add authorization header without token when no token is available', () => {
    const dummyCharges = [{ id: 1, amount: 100 }, { id: 2, amount: 200 }];
    jest.spyOn(authService, 'token', 'get').mockReturnValue(null);

    service.getCharges().subscribe(charges => {
      expect(charges).toEqual(dummyCharges);
    });

    const req = httpMock.expectOne('http://localhost:3002/api/charges');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer ');
    req.flush(dummyCharges);
  });
});
