import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { clearSelectedTables } from '../table-reservation/reservation.actions'; // Adjust the path as necessary
import { HttpClient } from '@angular/common/http';
import { TableButtonComponent } from '../../shared/table/table.component';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';
import { ReservationState } from '../table-reservation/reservation.reducer';
import { error } from 'node:console';
import { ClientRequest } from 'node:http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
  imports: [TableButtonComponent, CommonModule]
})
export class PaymentMethodComponent implements OnInit{


  commandId: number  = 0; // Will be populated from route
  selectedTable: number | null = null;
  selectedTables$ = this.store.select((state) => state.reservation.selectedTables);
  tables:Array<any>=[];
  payTablesBill:Array<any>=[];
  tablesTotal:number=0;

  payAll: boolean = false;

  serverLink: string = 'http://localhost:3003/dining';


  showAlert = false;
  alertMessage :string = "";

  tablesPaid: boolean = false ;



  constructor(private route: ActivatedRoute, private httpClient: HttpClient,    private store: Store<{ reservation: ReservationState }>,
  private router: Router) {
    // Get commandId from route parameters
  }



  ngOnInit(): void {
    // Get commandId from route parameters
    this.store.dispatch(clearSelectedTables());
    console.log("##### ON INIT");
    this.route.params.pipe(take(1)).subscribe(params => {
      this.commandId = parseInt(params['commandId']);
      this.loadClientsFromReservations(this.commandId);
    });
  }

  loadClientsFromReservations(commandId: number): void {
    this.httpClient.get<any>(`${this.serverLink}/command/${commandId}/tables`).pipe(take(1)).subscribe({
      next: (response: any) => {
        this.tables = response.tables; // Adjust based on your API response structure
        console.log(this.tables);
      },
      error: (error: any) => {
        console.error('Error fetching tables:', error);
        // Optional: Display error message to the user
      }
    });
  }



  selectTable(table: number, tablePaid: boolean) {
    if(tablePaid)
      this.triggerAlert("table already paid");
    else{
      this.closeAlert();
      this.selectedTables$.pipe(take(1)).subscribe({
        next: (selectedTables) => {
          console.log('Selected Tables:', selectedTables);
          if(selectedTables.length == 1){
            this.selectedTable = table;
            this.payAll = false;
          }
          else if(selectedTables.length>1){
            this.selectedTable = null;
            this.payAll = true ;
            this.calculateTotal(selectedTables);
          }else{
            this.payAll = false;
            this.selectedTable = null;
          }
        },
        error: (error) => {
          console.log('Error in selectedTables$', error);
        }
      });
    }
  }


  choosePaymentMethod() {
    //send to other screen with different values
    this.router.navigate([`/payment-review`, this.commandId, this.selectedTable]);
  }

  calculateTotal(selectedTables:number[]): number {
    this.httpClient.post(this.serverLink+"/payment/byTable",{
      "commandId":this.commandId,
      "selectedTables":selectedTables
    }
  ).pipe(take(1))
  .subscribe({
    next: (response:any) => {
      console.log("heloooooo");
      console.log(response);
      this.payTablesBill = response.tablesBill;
      this.tablesTotal = response.commandTotal;
    },
    error: (error) => {
      console.log('Error:', error);
    }});

    return 0;
  }
  processPayment() {
    console.log('Processing payment for the entire table... ',this.commandId);

    this.selectedTables$.pipe(take(1)).subscribe({
      next: (selectedTables) => {
        console.log('Selected Tables:', selectedTables);
        this.httpClient.post(this.serverLink + "/payment/process/byTables", {
          "commandId": this.commandId,
          "paidTables": selectedTables
        }).subscribe({
          next: (response) => {
            console.log('Payment processed successfully:', response);
            this.store.dispatch(clearSelectedTables());
            this.selectedTable = null ;
            this.payAll = false ;
            this.ngOnInit();
            this.tablesPaid = true ;
          },
          error: (error) => this.logError(error)
        });
      },
      error: (error) => this.logError(error)
    });
  }




  triggerAlert(alertMessage: string) {
    this.alertMessage = alertMessage ;
    this.showAlert = true;
    setTimeout(() => {
      this.closeAlert();
    }, 5000);
  }

  closeAlert() {
    this.showAlert = false;
  }
  logError(error:any){
    console.log('Error in selectedTables$', error);
  }

  GoHome(){
    this.router.navigateByUrl('');
  }
}
