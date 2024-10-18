import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import { TableReserveComponent } from '../../shared/table-reserve/table-reserve.component';



@Component({
  selector: 'app-table-reservation-event',
  standalone: true,
  imports: [MatCardModule,MatGridListModule,CommonModule,MatIconModule,TableReserveComponent],
  templateUrl: './table-reservation-event.component.html',
  styleUrl: './table-reservation-event.component.css'
})
export class TableReservationEventComponent {
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

