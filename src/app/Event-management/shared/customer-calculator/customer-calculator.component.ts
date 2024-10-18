import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StoreService } from '../../../services/store.service';
import { Table } from '../../../model/model';

@Component({
  selector: 'app-customer-calculator',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './customer-calculator.component.html',
  styleUrl: './customer-calculator.component.css'
})
export class CustomerCalculatorComponent {

  count: string = '0';
  type:string = "";
  serverLink: string = "http://localhost:9500/";
  tables: Table[] = [] as Table[];
  countEmptyTables:number=0;
  requiredNumberOfTables:number=0;
  constructor(private router: Router, private storeService: StoreService, private route: ActivatedRoute,private http: HttpClient,private snackBar: MatSnackBar) {
    this.route.data.subscribe(data => {
      this.type = data['type'];
    });
  }

  ngOnInit(): void {
    if (this.type=="customerCount") {
      this.http.get<Table[]>(this.serverLink + "dining/tables").subscribe({
        next: (response: Table[]) => {
          this.tables = response;
          console.log(response);
          this.countEmptyTables = this.tables.filter(table => !table.taken).length;
        },
        error: (error: any) => {
          console.log("Error fetching tables", error);
        }
      });
    }
  }
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Can be 'start', 'center', 'end', 'left', or 'right'
      verticalPosition: 'top', // Can be 'top' or 'bottom'
    });
  }
  increment() {
    this.count = (parseInt(this.count) + 1).toString();
  }

  decrement() {
    const currentCount = parseInt(this.count);
    if (currentCount > 0) {
      this.count = (currentCount - 1).toString();
    }
  }

  appendNumber(value: string) {
    if (this.count === '0') {
      this.count = value;  // Replace initial zero
    } else {
      this.count += value;  // Append the number
    }
  }

  clearNumber() {
    this.count = '0';  // Reset to zero
  }

  deleteLast() {
    this.count = this.count.length > 1 ? this.count.slice(0, -1) : '0';  // Delete the last character
  }

  validateButton() {
    if (this.type == "customerCount") {
      this.requiredNumberOfTables=Math.ceil(parseInt(this.count, 10) / 4);
      if(this.requiredNumberOfTables>this.countEmptyTables){
        this.openSnackBar("There is not enough available tables,please wait!");
      }
      else{
        this.storeService.setNumberOfPeople(parseInt(this.count, 10));
        this.router.navigate(['/table-reservation']);
      }
    }
    else{
      this.router.navigate(['/payment-method', this.count]);
    }
this.router.navigate(['/event-table-reservation']);
  }
}
