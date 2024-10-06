import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  private apiUrl = 'http://localhost:3003/dining/add-command';
  constructor(private http: HttpClient) { }

  createTableOrder(tablesNumber: number[], customersCount: number): Observable<any> {
    const body = { tablesNumber, customersCount };
    console.log(body);
    return this.http.post<any>(this.apiUrl, body);
  }

  getItems(type: string) {
    return this.http.get(`http://localhost:3003/menu?type=${type}`);
  }

  getAllItems(){
    return this.http.get('http://localhost:9500/menu/menus');
  }
}
