import { Injectable } from '@angular/core';
import {Cart} from "../model/Cart";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  addOrder(order: Cart) {
    console.log('OrderService.addOrder');
    console.log(order);
    return this.http.post<any>('http://localhost:3003/order', order);
  }
}
