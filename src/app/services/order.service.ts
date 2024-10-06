import { Injectable } from '@angular/core';
import {Cart} from "../model/Cart";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  addOrder(order: Cart) {
    return this.http.post<any>('http://localhost:3003/order', order);
  }

  validateOrder(commandId: number) {
    const body = { commandId };
    console.log('body', body);
    return this.http.post<any>('http://localhost:3003/validateOrder', body);
  }

  cancelOrder(commandId: number) {
    const body = { commandId };
    console.log('body', body);
    return this.http.post<any>('http://localhost:3003/cancelOrder', body);
  }


  getCilentOrders(commandId: number, clientId: number, tableId: number) {
    return this.http.get<any>(`http://localhost:3003/orders/${commandId}/${clientId}/${tableId}`);
  }
}
