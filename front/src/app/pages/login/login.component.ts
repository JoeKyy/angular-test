import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  showRegister: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        localStorage.setItem('access_token', response.token);
        this.router.navigate(['/protected']);
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  toggleRegister() {
    this.showRegister = !this.showRegister;
    this.errorMessage = '';
  }
}
