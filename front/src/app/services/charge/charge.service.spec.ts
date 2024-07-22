import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ChargeService } from './charge.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

describe('ChargeService', () => {
  let service: ChargeService;
  let httpMock: HttpTestingController;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn().mockReturnValue(true),
      getTokenFromStorage: jest.fn().mockReturnValue('mockToken')
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ChargeService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });
    service = TestBed.inject(ChargeService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get charges successfully', () => {
    const mockCharges = [{ id: 1, amount: 100, status: 'pending' }];
    service.getCharges().subscribe((charges) => {
      expect(charges).toEqual(mockCharges);
    });

    const req = httpMock.expectOne('http://localhost:3002/api/charges');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockCharges);
  });

  it('should throw an error if fetching charges fails', () => {
    service.getCharges().subscribe({
      next: () => fail('expected an error, not charges'),
      error: (error) => expect(error.message).toContain('Failed to fetch charges')
    });

    const req = httpMock.expectOne('http://localhost:3002/api/charges');
    req.flush('Failed to fetch charges', { status: 500, statusText: 'Server Error' });
  });
});
