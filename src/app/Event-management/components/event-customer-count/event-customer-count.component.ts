import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomerCalculatorComponent } from '../../shared/customer-calculator/customer-calculator.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-event-customer-count',
  standalone: true,
  imports: [MatCardModule,MatGridListModule,CommonModule,CustomerCalculatorComponent,MatIconModule],
  templateUrl: './event-customer-count.component.html',
  styleUrl: './event-customer-count.component.css'
})
export class EventCustomerCountComponent {

  rotation: number = 0;
  constructor(private router: Router) {}
  navigateToReservation() {
    this.router.navigate(['/event-form']);
  }
  rotateCard() {
    this.rotation += 90; // Increase rotation angle by 45 degrees
    if (this.rotation >= 360) {
      this.rotation = 0; // Reset to 0 after a full rotation
    }
  }
}
