import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChargeService } from '../../services/charge/charge.service';
import { RenegotiationService } from '../../services/renegotiation/renegotiation.service';
import { AuthService } from '../../services/auth/auth.service';
import { ChargeModel, RenegotiationModel } from '../../models';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  charges: ChargeModel[] = [];
  renegotiations: RenegotiationModel[] = [];

  constructor(
    private chargeService: ChargeService,
    private renegotiationService: RenegotiationService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getCharges();
    this.getRenegotiations();
  }

  getCharges() {
    this.chargeService.getCharges().subscribe(
      (data: { charges: ChargeModel[] }) => {
        this.charges = data.charges;
      },
      (error) => {
        console.error('Error fetching charges:', error);
        this.charges = [];
      }
    );
  }

  getRenegotiations() {
    this.renegotiationService.getRenegotiations().subscribe(
      (data: { renegotiations: RenegotiationModel[] }) => {
        this.renegotiations = data.renegotiations;
      },
      (error) => {
        console.error('Error fetching renegotiations:', error);
        this.renegotiations = [];
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
