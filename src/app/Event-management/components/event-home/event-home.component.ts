import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-event-home',
  standalone: true,
  imports: [MatCardModule,MatGridListModule,CommonModule,MatIconModule],
  templateUrl: './event-home.component.html',
  styleUrl: './event-home.component.css'
})
export class EventHomeComponent {
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
