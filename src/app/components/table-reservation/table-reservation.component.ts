import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Table } from '../../model/model';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { MenuServiceService } from '../../services/menu-service.service'; // Adjust path as necessary
import { MatSnackBar } from '@angular/material/snack-bar'; // Snackbar for notifications
import { CommonModule } from '@angular/common'; // For NgFor
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatCardModule } from '@angular/material/card'; // For Angular Material Card
import { MatButtonModule } from '@angular/material/button'; // For Angular Material Button
import { MatCheckboxModule } from '@angular/material/checkbox'; // For Angular Material Checkbox

@Component({
  selector: 'app-table-reservation',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [MatSnackBar],
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css'] // Use styleUrls, not styleUrl
})
export class TableReservationComponent {
  serverLink: string = "http://localhost:9500/";
  tables: Table[] = [] as Table[];
  numberOfCustomers: number = 0;
  numberOfTables: number = 0;
  selectedCount: number = 0;
  selectedTables: number[]=[];

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private router: Router,
    private menuServiceService: MenuServiceService,
    private snackBar: MatSnackBar // Snackbar for notifications
  ) {}

  ngOnInit(): void {
    //this.http.get<Table[]>(this.serverLink + "dining/tables").subscribe({
    //pull le back stp pour avoir ça
    this.http.get<Table[]>("http://localhost:3003/tables").subscribe({
      next: (response: Table[]) => {
        this.tables = response;
        console.log(response);
      },
      error: (error: any) => {
        console.log("Error fetching tables", error);
      }
    });

    this.numberOfCustomers = this.storeService.getNumberOfPeople();
    this.numberOfTables = Math.ceil(this.numberOfCustomers / 4);
  }
  toggleSelection(table: any) {
    if (!table.taken && !(this.selectedCount >= this.numberOfTables && !table.selected)) {
      table.selected = !table.selected;
      this.onSelectionChange();
    }
  }

  onSelectionChange() {
    this.selectedCount = this.tables.filter(table => table.selected).length;
    this.selectedTables = [];
    this.tables.filter(table => table.selected).forEach(table=>
      this.selectedTables.push(parseInt(table.number,10))
    );
  }

  navigateToNextPage() {
    if (this.selectedCount !== this.numberOfTables) {
      this.snackBar.open('Please select the correct number of tables!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } else {
      this.createOrder();
      this.router.navigate(['/table-categories']);
    }
  }

  createOrder() {
    // Appel du service avec un numéro de table et un nombre de clients
    this.menuServiceService.createTableOrder(this.selectedTables, this.numberOfCustomers) // Exemple avec tableNumber: 1, customersCount: 1
      .subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          localStorage.setItem('tableOrder', JSON.stringify(response));
        },
        error => {
          console.error('Erreur:', error);  // Gérer l'erreur
        }
      );
  }
}
