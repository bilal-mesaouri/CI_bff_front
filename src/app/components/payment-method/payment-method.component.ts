import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
@Component({
  standalone: true,
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
  imports: [CommonModule]
})
export class PaymentMethodComponent {
  selectedTables: number[] = []; // Will be populated from route
  selectedTable: number | null = null;
  paymentMethod: 'whole' | 'individual' | null = null;
  clients: { table: number; client: { name: string, amount: number }[] }[] = []; // Structured clients by table
  selectedClient: any = null;
  storage: Storage | null = null;  // Declare this.storage with proper type

  constructor(private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: any) {
    // Get selectedTables from route parameters
    this.route.params.subscribe(params => {
      const selectedTablesParam = params['selectedTables'];
      this.selectedTables = selectedTablesParam ? JSON.parse(selectedTablesParam) : [];
    });

    if (isPlatformBrowser(this.platformId) && typeof window !== 'undefined' && window.localStorage) {
        this.storage = window.localStorage;
      } else {
        this.storage = null; // Or handle this case accordingly
      }

    // Fetch reservations from local storage
    this.loadClientsFromReservations();
    console.log(this.clients);
  }

  loadClientsFromReservations() {
    const reservation = this.storage?.getItem("Reservations");
    const reservationsArray = reservation ? JSON.parse(reservation) : [];

    // Assuming each reservation has a table number, count of clients, and clients field
    this.clients = this.selectedTables.map(table => {
      const tableReservation = reservationsArray.find((res: { tableNumber: number; }) => res.tableNumber === table);
      const clientCount = tableReservation ? tableReservation.count : 0;

      // Create clients with a fixed amount of 40 for each
      const clientList = Array.from({ length: clientCount }, (_, index) => ({
        name: `Client ${index + 1}`, // Name each client
        amount: 40 // Fixed amount for each client
      }));
      return {
        table: table,
        client: clientList // Assign clients if available
      };
    });
  }

  getClientsForSelectedTable() {
    const table = this.clients.find(c => c.table === this.selectedTable);
    return table ? table.client : [];
  }
  
  selectTable(table: number) {
    this.selectedTable = table; // Set the currently selected table
    this.paymentMethod = null; // Reset payment method selection
    this.selectedClient = null; // Reset selected client
  }

  choosePaymentMethod(method: 'whole' | 'individual') {
    this.paymentMethod = method;
  }

  calculateTotal(): number {
    // Logic to calculate total for the whole table
    const tableClients = this.clients.find(c => c.table === this.selectedTable);
    return tableClients ? tableClients.client.reduce((sum, client) => sum + client.amount, 0) : 0;
  }

  selectClient(client: any) {
    this.selectedClient = client;
  }

  calculateClientTotal(client: any): number {
    return client.amount; // Example logic
  }

  processPayment() {
    console.log('Processing payment for entire table...');
  }

  processClientPayment(client: any) {
    console.log('Processing payment for', client.name);
  }
}
