import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../../shared/menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';
import { StoreService } from '../../services/store.service';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,MatCardModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() cart: any[] = [];
  @Input() isVisible: boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  orderValidated:boolean=false;
  orderId:any=this.store.getOrder().commandId;

  constructor(public menuComponent:MenuComponent, private store:StoreService,private router: Router){}

  getTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  closePopup(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.closePopupEvent.emit();
  }

  validateCart() {
    this.menuComponent.validateCart();
    //localStorage.clear();
    this.closePopup();
    this.orderValidated=true;

  }

  increaseQuantity(item: any) {
    item.quantity += 1;
    this.menuComponent.updateCart(item)
  }

  // Méthode pour diminuer la quantité
  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity -= 1;
      this.menuComponent.updateCart(item)
    }
  }
  navigateToHome() {
    this.router.navigate(['/']);
  }

}

