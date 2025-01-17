import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUsername: string = '';
  registerPassword: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  register(): void {
    this.authService.register(this.registerUsername, this.registerPassword).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.router.navigate(['/protected']);
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    );
  }
}
