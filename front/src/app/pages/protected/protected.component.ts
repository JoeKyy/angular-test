import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChargeService } from '../../services/charge/charge.service';
import { RenegotiationService } from '../../services/renegotiation/renegotiation.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.scss']
})
export class ProtectedComponent implements OnInit {
  charges: any[] = [];
  renegotiations: any[] = [];

  constructor(
    private chargeService: ChargeService,
    private renegotiationService: RenegotiationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getCharges();
    this.getRenegotiations();
  }

  getCharges() {
    this.chargeService.getCharges().subscribe(
      (data) => {
        this.charges = data.charges;
      },
      (error) => {
        console.error('Error fetching charges:', error);
      }
    );
  }

  getRenegotiations() {
    this.renegotiationService.getRenegotiations().subscribe(
      (data) => {
        this.renegotiations = data.renegotiations;
      },
      (error) => {
        console.error('Error fetching renegotiations:', error);
      }
    );
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/']);
  }
}
