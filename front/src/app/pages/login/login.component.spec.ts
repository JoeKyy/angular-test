import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
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

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login method on form submit', () => {
    const loginSpy = jest.spyOn(component, 'login');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should login successfully and navigate to protected route', () => {
    const navigateSpy = jest.spyOn((component as any).router, 'navigate');
    jest.spyOn(authService, 'login').mockReturnValue(of({ token: '12345' }));

    component.username = 'test';
    component.password = 'test';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('test', 'test');
    expect(navigateSpy).toHaveBeenCalledWith(['/protected']);
    expect(component.errorMessage).toBe('');
  });

  it('should display error message on login failure', () => {
    jest.spyOn(authService, 'login').mockReturnValue(throwError({ status: 401 }));

    component.username = 'test';
    component.password = 'wrongpassword';
    component.login();

    expect(authService.login).toHaveBeenCalledWith('test', 'wrongpassword');
    expect(component.errorMessage).toBe('Invalid credentials. Please try again.');
  });

  it('should toggle between login and register', () => {
    expect(component.showRegister).toBeFalsy();
    component.toggleRegister();
    expect(component.showRegister).toBeTruthy();
    component.toggleRegister();
    expect(component.showRegister).toBeFalsy();
  });
});
