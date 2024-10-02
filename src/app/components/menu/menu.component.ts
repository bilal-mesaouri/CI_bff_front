import { Component, OnInit  } from '@angular/core';
import { MenuServiceService } from '../../services/menu-service.service';
import { OrderService} from "../../services/order.service";
import { CommonModule } from '@angular/common';

import { MenuItem } from '../../model/MenuItem';
import { MenuItemComponent } from '../../shared/menu-item/menu-item.component';
import { CartComponent } from '../cart/cart.component';
import {HeaderComponent} from "../header/header.component";
import {Cart} from "../../model/Cart";
import { Router } from '@angular/router';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, MenuItemComponent, CartComponent, HeaderComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit{
  items: MenuItem[] = [];
  cart: Cart = {
    orderNumber: 0,
    clientNumber:0,
    tableNumber: 0,
    items:[]
  };
  isPopupVisible: boolean = false;

  constructor(  public menuServiceService: MenuServiceService, public orderServiceService: OrderService,
                private router: Router, private store:StoreService ) {}

  ngOnInit() {
    this.displayAllItems();
    this.loadCart();
    console.log('Cart validated', this.cart);
  }

  displayAllItems(){
    //console.log('displayAllItems');
    this.menuServiceService.getAllItems().subscribe((data: any) => {
        this.items = data.map((item: MenuItem) => {
          const cartItem = this.cart.items.find(i => i._id === item._id);
          return {
            ...item,
            quantity: cartItem ? cartItem.quantity : 0  // Charger la quantité sauvegardée ou initialiser à 0
          };
        });
      },
      error => {
        console.error('Error fetching items', error);
      });
  }

  displayItemsByType(type: string) {
    console.log(`displayItemsByType: ${type}`);
    this.menuServiceService.getItems(type).subscribe((data: any) => {
        this.items = data.map((item: MenuItem) => {
          const cartItem = this.cart.items.find(i => i._id === item._id);
          return {
            ...item,
            quantity: cartItem ? cartItem.quantity : 0  // Charger la quantité sauvegardée ou initialiser à 0
          };
        });
      },
      error => {
        console.error(`Error fetching ${type} items`, error);
      });
  }


  increaseQuantity(item: any) {
    item.quantity += 1;
    this.updateCart(item)
  }

  // Méthode pour diminuer la quantité
  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity -= 1;
      this.updateCart(item)
    }
  }

  handleQuantityChange(event: { itemId: string, quantity: number }) {
    const item = this.items.find(i => i._id === event.itemId);
    if (item) {
      item.quantity = event.quantity; // Met à jour la quantité de l'item
      this.updateCart(item)
    }
  }

  loadCart() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
    }
  }

  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }


  updateCart(item: MenuItem) {
    const existingItem = this.cart.items.find(i => i._id === item._id);
    if (item.quantity > 0) {
      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        this.cart.items.push({ ...item });
      }
    } else if (existingItem) {
      this.cart.items = this.cart.items.filter(i => i._id !== item._id);
    }
    this.updateLocalStorage();
  }

  validateCart() {

    console.log('Cart validated', this.cart);
    this.orderServiceService.addOrder(this.cart).subscribe((data: any) => {
      console.log('Order added', data);
    });


    if (this.store.getTableCompteur() === this.store.getOrder().tables.length-1 && this.store.getClientNumber() === this.store.getTable().clients.length) {
      this.store.setClientNumber(1);
      this.store.setTableCompteur(0);
      localStorage.clear();
      this.router.navigate(['/']);
    }else {
      this.store.incrementClient();
      this.router.navigate(['/table-categories']);
    }

  }

  getTotal(): number {
    let total = 0;
    this.cart.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }


  openPopup() {
    this.isPopupVisible = true;
  }

  // Méthode pour fermer le popup
  closePopup() {
    this.isPopupVisible = false;
  }

}
