import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableButtonComponent } from '../../shared/table/table.component';
import { NgForOf, Location, CommonModule } from '@angular/common';

import {
  selectTable,
  unselectTable,
} from '../../components/table-reservation/reservation.actions';
import { ReservationState } from '../../components/table-reservation/reservation.reducer';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-reservation',
  standalone: true,
  imports: [TableButtonComponent, NgForOf, CommonModule],
  templateUrl: './table-reservation.component.html',
  styleUrl: './table-reservation.component.css',
})
export class TableReservationComponent {
  serverLink: string = 'http://localhost:3003/';
  tableData: any[] = [];
  selectedTables$: Observable<number[]>;
  type:string = "";

  constructor(
    private httpClient: HttpClient,
    private location: Location,
    private store: Store<{ reservation: ReservationState }>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedTables$ = this.store.select(
      (state) => state.reservation.selectedTables
    );
  }

  ngOnInit(): void {
    this.route.data.pipe(take(1)).subscribe(data => {
      this.type = data["type"];
      console.log('Flag value:', this.type);
    });
    this.httpClient.get<any[]>(this.serverLink + 'dining/tables').subscribe({
      next: (response: any[]) => {
        this.tableData = response;
      },
      error: (error: any) => {
        console.log('Error', error);
      },
    });
  }
  goBack(): void {
    this.location.back(); // Navigates to the previous page
  }

  confirmReservation() {
    // Log the selected tables for confirmation
    this.selectedTables$.pipe(take(1)).subscribe({
      next: (selectedTables) => {
        console.log('Selected Tables:', selectedTables);
        if (this.type == "reservation") {
          this.httpClient.post(this.serverLink + "dining/tables", {
            "selectedTables": selectedTables 
          })
          .pipe(take(1))
          .subscribe({
            next: (response:any) => {
              console.log('Response:', response);
              var reservation = localStorage.getItem("Reservations");
              var reservationsArray = reservation ? JSON.parse(reservation) : [];
              reservationsArray.push(...response.reservations); 
              localStorage.setItem("Reservations", JSON.stringify(reservationsArray));
            },
            error: (error) => {
              console.log('Error:', error);
            }
          });
          
        } else {
          this.router.navigate(['/payment-method', { selectedTables: JSON.stringify(selectedTables) }]);
        }
      },
      error: (error) => {
        console.log('Error in selectedTables$', error);
      }
    });
  }
  
  
}
