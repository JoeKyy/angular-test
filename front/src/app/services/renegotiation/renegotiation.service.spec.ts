import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RenegotiationService } from './renegotiation.service';
import { AuthService } from '../auth/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../../interceptors/auth.interceptor';

describe('RenegotiationService', () => {
  let service: RenegotiationService;
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
        RenegotiationService,
        { provide: AuthService, useValue: authServiceMock },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
      ]
    });
    service = TestBed.inject(RenegotiationService);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get renegotiations successfully', () => {
    const mockRenegotiations = [{ id: 1, status: 'pending' }, { id: 2, status: 'approved' }];
    service.getRenegotiations().subscribe((renegotiations) => {
      expect(renegotiations).toEqual(mockRenegotiations);
    });

    const req = httpMock.expectOne('http://localhost:3003/api/renegotiations');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe('Bearer mockToken');
    req.flush(mockRenegotiations);
  });

  it('should throw an error if fetching renegotiations fails', () => {
    service.getRenegotiations().subscribe({
      next: () => fail('expected an error, not renegotiations'),
      error: (error) => expect(error.message).toContain('Failed to fetch renegotiations')
    });

    const req = httpMock.expectOne('http://localhost:3003/api/renegotiations');
    req.flush('Failed to fetch renegotiations', { status: 500, statusText: 'Server Error' });
  });
});
