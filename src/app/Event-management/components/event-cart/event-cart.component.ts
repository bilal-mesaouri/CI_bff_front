import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {MenuItemComponent} from "../menu-item/menu-item.component";
import {CreateEventService} from "../../../services/create-event.service";

@Component({
  selector: 'app-event-cart',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    MenuItemComponent
  ],
  templateUrl: './event-cart.component.html',
  styleUrl: './event-cart.component.css'
})
export class EventCartComponent {
  @Input() cart: any ;
  @Input() isVisible: boolean = false;
  @Input() isDrinks : boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();
  @Input() isCentralTable: boolean = true;

  constructor(private createEventService: CreateEventService) {
  }
  closePopup(event?: Event) {

    if (event) {
      event.stopPropagation();
    }
    this.closePopupEvent.emit();
    this.isVisible = false;
  }

  getTotal() {
    // @ts-ignore
    let total=0;
    if (this.cart.STARTER){
      total = total+this.cart.STARTER.price;
    }
    if (this.cart.MAIN){
      total = total+this.cart.MAIN.price;
    }
    if (this.cart.DESSERT){
      total = total+this.cart.DESSERT.price;
    }
    return total;
  }

}
