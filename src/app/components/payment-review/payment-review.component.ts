import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';  // Ajout de HttpClient pour charger un fichier JSON depuis le serveur
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { take } from 'rxjs';
@Component({
  selector: 'app-payment-review',
  templateUrl: './payment-review.component.html',
  standalone: true,
  imports: [
    CurrencyPipe,
    CommonModule
  ],
  styleUrls: ['./payment-review.component.scss']
})
export class PaymentReviewComponent {
  command: any = {};
  selectedTable: any = {};
  selectedClients: any[] = [];
  storage: Storage | null = null;
  tableNumber: number | null = null;
  commandId: number | undefined;
  serverLink: string = 'http://localhost:3003/dining';


  constructor(
      private route: ActivatedRoute,
      private httpClient: HttpClient,
  ) {

  }
  ngOnInit(): void {



    this.route.params.subscribe(params => {
      this.tableNumber = +params['tableNumber'];
      this.commandId= +params['orderId'];
      console.log("Table Number from URL:", this.tableNumber);
      this.loadCommandFromFile(this.commandId);  // Charger les données JSON depuis le serveur
    });
    
  }

  loadCommandFromFile(commandId:number) {

    this.httpClient.get<any>(`${this.serverLink}/command/${commandId}/tables`).pipe(take(1)).subscribe({
      next: (response: any) => {
        this.selectedTable = response.tables.find((table: any) => +table.tableNumber === this.tableNumber);
      },
      error: (error: any) => {
        console.error('Error fetching tables:', error);
        // Optional: Display error message to the user
      }
    });
  }



  calculateClientTotal(client: any): number {
    return client.items.reduce((sum: number, item: any) => sum + (item.quantity * item.price), 0);
  }


  toggleClientSelection(client: any) {
    const index = this.selectedClients.indexOf(client);
    if (index === -1) {
      this.selectedClients.push(client);
    } else {
      this.selectedClients.splice(index, 1);
    }
  }


  calculateSelectedClientsTotal(): number {
    return this.selectedClients.reduce((sum, client) => sum + this.calculateClientTotal(client), 0);
  }


  payOrder() {

    var paidClients: number[]= [];
    this.selectedClients.forEach(client => {
      paidClients.push(client.client);
    });
    console.log(this.selectedClients);
    this.httpClient.post(`${this.serverLink}/pay-clients`,{
      "commandId":this.commandId,
      "tableNumber":this.tableNumber,
      "paidClients":paidClients
    }).subscribe({
      next:()=>{
        console.log("paid")
        this.ngOnInit();
      },
      error:()=>{

      }
    })

    this.selectedClients = [];


    // this.checkIfTableIsPaid();



  }

  checkIfTableIsPaid() {
    const allClientsPaid = this.selectedTable.clients.every((client: any) => client.clientPaid);
    this.selectedTable.tablePaid = allClientsPaid;
  }



  isClientSelected(client: any): boolean {
    return this.selectedClients.includes(client);
  }


  hasClientPaid(client: any): boolean {
    return client.clientPaid;
  }


  getClientButtonClass(client: any): string {
    if (this.hasClientPaid(client)) {
      return 'paid';  // Vert si payé
    } else if (this.isClientSelected(client)) {
      return 'selected';  // Bleu si sélectionné
    }
    return 'default';  // Gris par défaut
  }
}
