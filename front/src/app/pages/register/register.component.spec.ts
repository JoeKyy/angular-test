import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth/auth.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      providers: [AuthService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register method on form submit', () => {
    const registerSpy = jest.spyOn(component, 'register');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should register successfully and navigate to protected route', () => {
    const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation(() => Promise.resolve(true));
    jest.spyOn(authService, 'register').mockReturnValue(of({ token: '12345' }));

    component.registerUsername = 'newuser';
    component.registerPassword = 'newpassword';
    component.register();

    expect(authService.register).toHaveBeenCalledWith('newuser', 'newpassword');
    expect(navigateSpy).toHaveBeenCalledWith(['/protected']);
    expect(component.errorMessage).toBe('');
  });

  it('should display error message on registration failure', () => {
    jest.spyOn(authService, 'register').mockReturnValue(throwError({ status: 400, error: 'User already exists' }));

    component.registerUsername = 'existinguser';
    component.registerPassword = 'password';
    component.register();

    expect(authService.register).toHaveBeenCalledWith('existinguser', 'password');
    expect(component.errorMessage).toBe('Registration failed. Please try again.');
  });
});
