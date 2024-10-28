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
  @Output() itemRemoved = new EventEmitter<any>();

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
    return this.cart.STARTER.price + this.cart.MAIN.price + this.cart.DESSERT.price;
  }


  display2(hi : any) {
    console.log(' hi:', hi);
  }

  removeItem(item: any) {
    this.createEventService.removeItem(item).subscribe({
      next: (data) => {
        console.log('item removed:', data);
        this.itemRemoved.emit(item);
      }
    });
  }
}
