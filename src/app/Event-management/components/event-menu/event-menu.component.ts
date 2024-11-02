import {Component, Input, OnInit} from '@angular/core';
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
import {CartComponent} from "../../../components/cart/cart.component";
import {OrderService} from "../../../services/order.service";
import {Cart} from "../../../model/Cart";


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
    NgIf,
    CartComponent

  ],
  templateUrl: './event-menu.component.html',
  styleUrl: './event-menu.component.css'
})
export class EventMenuComponent implements OnInit {
  @Input() isEventMenu:boolean=false;
  orderValidated:boolean=false;
  othersOrders: any[] = [];

  items: MenuItem[] = [];
  isPopupVisible: boolean = false;
  isCopyModalVisible: boolean = false;
  isDetailModalVisible: boolean = false;
  selectedClient: any = {};
  eventCart: any = {
    name: "",
    items: {
      STARTER: null,
      MAIN: null,
      DESSERT: null,
      BEVERAGES: []
    }
  };
  cart: Cart = {
    orderNumber: 0,
    clientNumber:0,
    tableNumber: 0,
    items:[]
  };


  getClientNumber(): number {
    return this.store.getClientNumber();
  }
  getTotal(): number {
    let total = 0;
    this.cart.items.forEach(item => {
      total += item.price * item.quantity;
    });
    return total;
  }

  navigateToHome() {
    this.router.navigate(['/']);
  }
  getorderNumber(): number {
    return this.store.getOrder().commandId;
  }
  closeDetailModal() {
    this.isDetailModalVisible = false;
    this.isCopyModalVisible = true;
  }

  validateCart() {

    console.log('Cart validated', this.eventCart);
    this.orderServiceService.addOrder(this.eventCart).subscribe((data: any) => {
      console.log('Order added', data);
    });


    if (this.store.getTableCompteur() === this.store.getOrder().tables.length-1 && this.store.getClientNumber() === this.store.getTable().clients.length) {
      this.store.setClientNumber(1);
      this.store.setTableCompteur(0);
      console.log('Order validated', this.store.getOrder().commandId);
      this.orderServiceService.validateOrder(this.store.getOrder().commandId).subscribe((data: any) => {
        console.log('Order validated', data);
      });
      localStorage.clear();
      this.orderValidated=true;
    }else {
      this.store.incrementClient();
      this.router.navigate(['/table-categories']);
    }

  }
  updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
  calculateTotal(items: any[]) {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
  }

  copyOrder() {
    this.cart.items = this.selectedClient.items;
    this.updateLocalStorage();
    this.isDetailModalVisible = false;
  }
  closeCopyModal() {
    this.isCopyModalVisible = false;
  }
  getdetails(client: any) {
    this.selectedClient = client;
    this.isCopyModalVisible = false;
    this.isDetailModalVisible = true;
  }
  openCopyModal() {
    this.isCopyModalVisible = true;
    this.getOthersOrder();
  }
  gettableNumber(): number {
    return this.store.getTable().tableNumber;
  }

  getOthersOrder() : any{
    this.orderServiceService.getCilentOrders(this.getorderNumber(),this.getClientNumber(),this.gettableNumber()).subscribe((data: any) => {
      console.log('data is here ',data)
      console.log(data.length)
      if (data.length > 0) {

        this.othersOrders = data;
      }
      console.log('Orders fetched', this.othersOrders);
    });
  }
  constructor(public menuServiceService: MenuServiceService, private router: Router,
              private store: StoreService, private createEventService: CreateEventService,public orderServiceService:OrderService) {
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
    this.eventCart.items[category] = item;
    console.log('this cart items:', this.eventCart.items[category]);
    this.store.setCartItems(item, category);
  }

  addBeverage(item: MenuItem) {
    //check if the item is already in the cart if i's not the case add it
    if (!this.eventCart.items.BEVERAGES.includes(item)) {
      this.eventCart.items.BEVERAGES.push(item);
      this.store.setCartBeverages(this.eventCart.items.BEVERAGES);
    }
  }

  removeBeverage(index: number) {
    this.eventCart.items.BEVERAGES.splice(index, 1);
    console.log('Removed from BEVERAGES at index:', index);
  }

  openPopup() {
    this.isPopupVisible = true;
  }

  closePopup() {
    this.isPopupVisible = false;
  }

  isEmptyCart() {
    return  (this.eventCart.items.STARTER == null ) &&
            (this.eventCart.items.MAIN == null )&&
            (this.eventCart.items.DESSERT == null) &&
            (this.eventCart.items.BEVERAGES.length == 0);
  }


  addItem(item: MenuItem, category: string) {
    if (category === 'BEVERAGE') {
      this.addBeverage(item);
    }else {
      this.addItemToCategory(item, category);
    }
  }

  setMenuName() {
    this.eventCart.name = this.store.getMenuName();
  }

  validateMenu() {
    this.createEventService.getEvent().subscribe((data: any) => {
      let event ={
        ...data,
        menu: this.eventCart
      }
      this.createEventService.createMenu(event).subscribe((data: any) => {
      });
      this.store.clearCart();
      this.router.navigate(['/crate-menu']);
    });
  }

  getTotalPrice() {
    let total = 0;
    for (const key in this.eventCart.items) {
      if (this.eventCart.items[key] != null) {
        if (key != 'BEVERAGES') {
          total += this.eventCart.items[key].price;
        }
      }
    }
    return total;
  }

  private getCart() {
    const savedCart = this.store.getCart();
    console.log('Saved cart:', savedCart);
    if (savedCart) {
      this.eventCart.items = savedCart;
    } else {
      this.initCart();
      console.log('Cart initialized:', this.eventCart);
    }
  }

  private initCart() {
    this.eventCart = {
      items: {
        STARTER: null,
        MAIN: null,
        DESSERT: null,
        BEVERAGES: []
      }
    }
  }
}
