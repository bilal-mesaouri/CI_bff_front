import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {TableComponent} from "../../shared/table/table.component";
import {Table} from "../../model/model";
import {NgForOf} from "@angular/common";
import { StoreService } from '../../services/store.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-table-reservation',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCheckbox,
    TableComponent,
    NgForOf,
    CommonModule
  ],
  templateUrl: './table-reservation.component.html',
  styleUrl: './table-reservation.component.css'
})
export class TableReservationComponent {
  httpClient: HttpClient ;
  serverLink: string = "http://localhost:9500/";

  table:Table={"number":'2', "taken":false} as Table;

tables:Table[] =[
  {"number":'1', "taken":true},
  {"number":'2', "taken":false},
  {"number":'3', "taken":false},
  {"number":'4', "taken":false},
  {"number":'5', "taken":false},
  {"number":'6', "taken":false}] as Table[];
numberOfCustomers: number | undefined;
  numberOfTables: number | undefined;

  selectedCount = 0;


  constructor(private http: HttpClient,private storeService: StoreService) {
    this.httpClient = http ;
  }



  ngOnInit(): void {
    this.http.get<any[]>(this.serverLink+"dining/tables").pipe(
      map(data => data.filter(item => item.number >5))
    ).subscribe({
      next: (response :any)=>{
        this.tables=response;

        console.log(response);return response;},
      error:(error:any) => { console.log("eroooooor",error); }
    }
    );
    this.numberOfCustomers=this.storeService.getNumberOfPeople();
    this.numberOfTables=Math.ceil(this.numberOfCustomers / 4);



  }
  onSelectionChange() {
    // Met à jour le compteur de tables sélectionnées
    this.selectedCount = this.tables.filter(table => table.selected).length;
  }
}
