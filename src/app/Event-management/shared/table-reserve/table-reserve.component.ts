import {Component, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'; // Snackbar for notifications
import { CommonModule } from '@angular/common'; // For NgFor
import { FormsModule } from '@angular/forms'; // For ngModel
import { MatCardModule } from '@angular/material/card'; // For Angular Material Card
import { MatButtonModule } from '@angular/material/button'; // For Angular Material Button
import { MatCheckboxModule } from '@angular/material/checkbox'; // For Angular Material Checkbox
import { StoreService } from '../../../services/store.service';
import { MenuServiceService } from '../../../services/menu-service.service';
import { Table } from '../../../model/model';

@Component({
  selector: 'app-table-reserve',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [MatSnackBar],
  templateUrl: './table-reserve.component.html',
  styleUrl: './table-reserve.component.css'
})
export class TableReserveComponent {
  @Input() routeToNavigate:string='/table-categories';

  serverLink: string = "http://localhost:9500/";
  tables: Table[] = [] as Table[];
  numberOfCustomers: number = 0;
  numberOfTables: number = 0;
  selectedCount: number = 0;
  selectedTables: number[] = [];
  private apiUrl = 'http://localhost:3003/addEvent';

  constructor(
    private http: HttpClient,
    private storeService: StoreService,
    private router: Router,
    private menuServiceService: MenuServiceService,
    private snackBar: MatSnackBar, // Snackbar for notifications
    private store: StoreService
  ) {
  }

  ngOnInit(): void {
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
    this.tables.filter(table => table.selected).forEach(table =>
      this.selectedTables.push(parseInt(table.number, 10))
    );
  }

  navigateToNextPage() {
    if (this.selectedCount !== this.numberOfTables) {
      this.snackBar.open('Please select the correct number of tables!', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    } else {
      this.storeService.setTablesForEvent(this.selectedTables);
      this.http.post(this.apiUrl, { event: this.storeService.getEvent() }).subscribe(
       (response) => {
         console.log('Event added successfully:', response);
       },
       (error) => {
         console.error('Error adding event:', error);

       }
     );
      this.createOrder();
      this.router.navigate([this.routeToNavigate]);

    }
  }

  createOrder() {
    // Appel du service avec un numéro de table et un nombre de clients
    this.menuServiceService.createTableOrder(this.selectedTables, this.numberOfCustomers) // Exemple avec tableNumber: 1, customersCount: 1
      .subscribe(
        response => {
          console.log('Réponse du serveur:', response);
          localStorage.setItem('tableOrder', JSON.stringify(response));

          this.store.setOrder(JSON.parse(<string>localStorage.getItem('tableOrder')));
          this.store.setTable(this.store.getOrder().tables[this.store.getTableCompteur()]);
          let cart = {
            orderNumber: this.store.getOrder().commandId,
            clientNumber: this.store.getClientNumber(),
            tableNumber: this.store.getTable().tableNumber,
            items: []
          }
          localStorage.setItem('cart', JSON.stringify(cart));
        },
        error => {
          console.error('Erreur:', error);  // Gérer l'erreur
        }
      );
  }
}
