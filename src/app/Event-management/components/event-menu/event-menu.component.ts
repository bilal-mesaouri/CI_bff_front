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
    this.cart.items[category] = item;
    console.log('Added to category:', this.cart.items[category]);
  }

  addBeverage(item: MenuItem) {
    this.cart.items.BEVERAGES.push(item);
    console.log('Added to BEVERAGES:', item);
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
    console.log('Category:', category);
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
      console.log('validateMenu menu :', this.cart );
      let event ={
        ...data,
        menu: this.cart
      }
      console.log('validateMenu event :', event );
      this.createEventService.createMenu(event).subscribe((data: any) => {
        console.log('Menu created:', data);
      });
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


}
