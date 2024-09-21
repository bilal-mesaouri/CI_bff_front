import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatCheckbox} from "@angular/material/checkbox";
import {TableComponent} from "../../shared/table/table.component";
import {Table} from "../../model/model";
import {NgForOf} from "@angular/common";


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
    NgForOf
  ],
  templateUrl: './table-reservation.component.html',
  styleUrl: './table-reservation.component.css'
})
export class TableReservationComponent {
  httpClient: HttpClient ;
  serverLink: string = "http://localhost:3003/";

  table:Table={"number":'2', "taken":false} as Table;

tables:Table[] =[
  {"number":'2', "taken":false},
  {"number":'2', "taken":false},
  {"number":'2', "taken":false},
  {"number":'2', "taken":false}] as Table[];
  constructor(private http: HttpClient) {
    this.httpClient = http ;
  }



  ngOnInit(): void {
    this.http.get<any[]>(this.serverLink+"dining/tables").pipe(
      map(data => data.filter(item => item.number >5))
    ).subscribe({
      next: (response :any)=>{console.log(response);return response;},
      error:(error:any) => { console.log("eroooooor",error); }
    }
    );

  }
}
