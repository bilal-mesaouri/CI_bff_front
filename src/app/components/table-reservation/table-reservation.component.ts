import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-table-reservation',
  standalone: true,
  imports: [],
  templateUrl: './table-reservation.component.html',

  styleUrl: './table-reservation.component.css'
})
export class TableReservationComponent {
  httpClient: HttpClient ;
  serverLink: string = "http://localhost:3003/";
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
