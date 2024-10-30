import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebSocketService } from '../../../services/web-socket.service';
import {NgForOf, NgIf} from "@angular/common";
import {MenuItemComponent} from "../menu-item/menu-item.component";
import {EventCartComponent} from "../event-cart/event-cart.component";
import {CreateEventService} from "../../../services/create-event.service";

@Component({
  selector: 'app-commun-event-cart',
  standalone: true,
  imports: [NgIf, NgForOf, MenuItemComponent, EventCartComponent],
  templateUrl: './commun-event-cart.component.html',
  styleUrl: './commun-event-cart.component.css'
})
export class CommunEventCartComponent implements OnInit, OnDestroy{

  private fileChangeSubscription: Subscription | undefined;
  menusData: any = {
    name: "",
    date: "",
    menu: []
  };
  isVisible :boolean = false;
  isDrinksVisible : boolean = false;
  visibleCartIndex: number | null = null

  constructor(private webSocketService: WebSocketService, private createEventService:CreateEventService) {}

  ngOnDestroy(): void {
    if (this.fileChangeSubscription) {
      this.fileChangeSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.fileChangeSubscription = this.webSocketService.getFileChanges().subscribe({
      next: (data) => {
        console.log('Données mises à jour:', data);
        this.menusData = data;
      }
    });
  }


  openmenu(index: number) {
    this.isVisible = true;
    this.visibleCartIndex = index;

  }

  closePopup() {
    this.isVisible = false;
    this.visibleCartIndex = null;
  }

  getItemForCart(menu: any) {
    let cart = {
      STARTER: menu.items.STARTER,
      MAIN: menu.items.MAIN,
      DESSERT: menu.items.DESSERT,
      BEVERAGES: menu.BEVERAGES
    }
    return cart;
  }

  openDrinks() {
    this.isDrinksVisible = true;
  }

  getDrinks() {
    return this.menusData.BEVERAGES;
  }

  removeMenu(menuToRemove: any): void {
    console.log('menuToRemove:', menuToRemove);
    this.createEventService.removeMenu(menuToRemove).subscribe({
      next: (data) => {
        console.log('Menu supprimé:', data);
      }
    });
  }

  closeDrinks() {
    this.isDrinksVisible = false;
  }

  validateMenus() {
    this.createEventService.validate().subscribe({
      next: (data) => {
        console.log('Menu créé:', data);
      }
    });
  }
}
