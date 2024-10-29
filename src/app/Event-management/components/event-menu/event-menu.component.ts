import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {MenuItemComponent} from "../menu-item/menu-item.component";
import {NgForOf, NgIf} from "@angular/common";
import {MenuServiceService} from "../../../services/menu-service.service";
import {Router} from "@angular/router";
import { MenuItem } from '../../../model/MenuItem';
import {EventCartComponent} from "../event-cart/event-cart.component";
import { StoreService} from "../../../services/store.service";
import { CreateEventService } from "../../../services/create-event.service";


@Component({
  selector: 'app-event-menu',
  standalone: true,
  imports: [
    HeaderComponent,
    MatDrawer,
    MatDrawerContainer,
    MatDrawerContent,
    MenuItemComponent,
    NgForOf,
    EventCartComponent,
    NgIf

  ],
  templateUrl: './event-menu.component.html',
  styleUrl: './event-menu.component.css'
})
export class EventMenuComponent implements OnInit {
  items: MenuItem[] = [];
  isPopupVisible: boolean = false;
  cart: any = {
    name: "",
    items: {
      STARTER: null,
      MAIN: null,
      DESSERT: null,
      BEVERAGES: []
    }
  };


  constructor(public menuServiceService: MenuServiceService, private router: Router,
              private store: StoreService, private createEventService: CreateEventService) {
  }


  ngOnInit(): void {
    this.displayAllItems();
    this.setMenuName();
    this.getCart();
  }

  displayAllItems() {
    this.menuServiceService.getAllItems().subscribe((data: any) => {
      this.items = data;
    });
  }

  displayItemsByType(type: string) {
    this.menuServiceService.getItems(type).subscribe((data: any) => {
      this.items = data;
    });
  }

  addItemToCategory(item: MenuItem, category: string) {
    console.log('Adding item to category:', category);
    this.cart.items[category] = item;
    console.log('this cart items:', this.cart.items[category]);
    this.store.setCartItems(item, category);
  }

  addBeverage(item: MenuItem) {
    //check if the item is already in the cart if i's not the case add it
    if (!this.cart.items.BEVERAGES.includes(item)) {
      this.cart.items.BEVERAGES.push(item);
      this.store.setCartBeverages(this.cart.items.BEVERAGES);
    }
  }

  removeBeverage(index: number) {
    this.cart.items.BEVERAGES.splice(index, 1);
    console.log('Removed from BEVERAGES at index:', index);
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  isEmptyCart() {
    return  (this.cart.items.STARTER == null ) &&
            (this.cart.items.MAIN == null )&&
            (this.cart.items.DESSERT == null) &&
            (this.cart.items.BEVERAGES.length == 0);
  }


  addItem(item: MenuItem, category: string) {
    if (category === 'BEVERAGE') {
      this.addBeverage(item);
    }else {
      this.addItemToCategory(item, category);
    }
  }

  setMenuName() {
    this.cart.name = this.store.getMenuName();
  }

  validateMenu() {
    this.createEventService.getEvent().subscribe((data: any) => {
      let event ={
        ...data,
        menu: this.cart
      }
      this.createEventService.createMenu(event).subscribe((data: any) => {
      });
      this.store.clearCart();
      this.router.navigate(['/crate-menu']);
    });
  }

  getTotalPrice() {
    let total = 0;
    for (const key in this.cart.items) {
      if (this.cart.items[key] != null) {
        if (key != 'BEVERAGES') {
          total += this.cart.items[key].price;
        }
      }
    }
    return total;
  }

  private getCart() {
    if(this.store.getCart() != null) {
      this.cart.STARTER = this.store.getCart();
      this.cart.MAIN = this.store.getCart();
      this.cart.DESSERT = this.store.getCart();
      this.cart.BEVERAGES = this.store.getCart();
    }else {
      this.initCart();
      console.log('Cart initialized:', this.cart);
    }
  }

  private initCart() {
    this.cart = {
      items: {
        STARTER: null,
        MAIN: null,
        DESSERT: null,
        BEVERAGES: []
      }
    }
  }
}
