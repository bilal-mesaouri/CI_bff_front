import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import { StoreService } from '../../services/store.service';
import { MenuServiceService } from '../../services/menu-service.service'; // Adjust path as necessary
import { Table } from '../../model/model';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-customer-counter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './customer-counter.component.html',
  styleUrl: './customer-counter.component.scss'
})

export class CustomerCounterComponent {
  serverLink: string = "http://localhost:9500/";
  tables: Table[] = [] as Table[];
  count: string = '0';
  countEmptyTables:number=0;
  requiredNumberOfTables:number=0;

  constructor(private router: Router,private storeService: StoreService,private http: HttpClient,private snackBar: MatSnackBar) {}
  increment() {
    this.count = (parseInt(this.count) + 1).toString();
  }
  ngOnInit(): void {
    this.http.get<Table[]>("http://localhost:3003/tables").subscribe({
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
  openSnackBar(message: string, action: string = 'Close') {
    this.snackBar.open(message, action, {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'right', // Can be 'start', 'center', 'end', 'left', or 'right'
      verticalPosition: 'top', // Can be 'top' or 'bottom'
    });
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
    this.requiredNumberOfTables=Math.ceil(parseInt(this.count, 10) / 4);
    if(this.requiredNumberOfTables>this.countEmptyTables){
      console.log("herrrrrrre",this.requiredNumberOfTables);
      console.log(this.countEmptyTables);
      this.openSnackBar("There is not enough available tables,please wait!");
    }
    else{
      this.storeService.setNumberOfPeople(parseInt(this.count, 10));
      this.router.navigate(['/table-reservation']);
    }
  }
}
