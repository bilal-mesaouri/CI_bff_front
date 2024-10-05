import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import {OrderService} from "../../services/order.service";
import { StoreService } from '../../services/store.service';

@Component({
  standalone:true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private location: Location, private router: Router, private orderService: OrderService,
              private storeService: StoreService) {}

  goBack() {
    this.location.back();
  }

  cancel() {
    console.log('Cancelling order');
    console.log('Order', localStorage.getItem('tableOrder'));
    const orderNumber = JSON.parse(<string>localStorage.getItem('tableOrder')).commandId;
    console.log('Order number', orderNumber);
    if (!orderNumber) {
      return;
    }
    this.orderService.cancelOrder(orderNumber).subscribe({
      next: () => {
        localStorage.clear();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Error cancelling order', error);
      }
    });
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
