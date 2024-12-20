import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { Evenement } from '../../../model/event';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    MatGridListModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule
  ],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css'] // Corrected here
})
export class EventFormComponent {
  eventName: string = '';
  minNumberOfGuests:string='';
  rotation: number = 0;
  eventDate: Date =new Date();
  event:Evenement={} as Evenement;
  private apiUrl = 'http://localhost:3003/addEvent';

  constructor(private http: HttpClient, private router: Router,private snackBar: MatSnackBar, private storeService: StoreService) {}

  navigateToReservation() {
    this.addEvent();
  }

  addEvent() {
    if(!this.eventName || !this.eventDate || !this.minNumberOfGuests ){
      this.openSnackBar("All fields are required!");
    }
    else{
      this.event.name = this.eventName; // Set the event name
      this.event.date = this.formatDateToString(this.eventDate); // Set the formatted date
      this.event.minNumberOfGuests=this.minNumberOfGuests;
      this.storeService.setEvent(this.event);
      this.router.navigate(['/event-customer-count']);

      // Make an HTTP POST request to add the event
 /*     this.http.post(this.apiUrl, { event: this.event }).subscribe(
        (response) => {
          console.log('Event added successfully:', response);
          this.router.navigate(['/event-customer-count']);
        },
        (error) => {
          console.error('Error adding event:', error);

        }
      );*/
    }

  }

  rotateCard() {
    this.rotation += 90; // Increase rotation angle by 90 degrees
    if (this.rotation >= 360) {
      this.rotation = 0; // Reset to 0 after a full rotation
    }
  }

   formatDateToString(date: Date): string {
     const day: string = String(date.getDate()).padStart(2, '0'); // Obtenir le jour et ajouter un zéro devant si nécessaire
     const month: string = String(date.getMonth() + 1).padStart(2, '0'); // Obtenir le mois (0-11 donc +1) et ajouter un zéro devant si nécessaire
     const year: string = String(date.getFullYear()); // Obtenir l'année
     return `${day}/${month}/${year}`;
   }
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'center', // Can be 'start', 'center', 'end', 'left', or 'right'
      verticalPosition: 'top', // Can be 'top' or 'bottom'
    });
  }
}
