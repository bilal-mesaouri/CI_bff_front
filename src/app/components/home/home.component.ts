import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule,MatButton,ButtonModule,ImageModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) {}

  navigateToReservation() {
    this.router.navigate(['/customer-count']);
  }
  navigateToPayment() {
    this.router.navigate(['/orderId']);
  }

}
