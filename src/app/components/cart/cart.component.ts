import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItemComponent } from '../../shared/menu-item/menu-item.component';
import { MenuComponent } from '../menu/menu.component';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  @Input() cart: any[] = [];
  @Input() isVisible: boolean = false;
  @Output() closePopupEvent = new EventEmitter<void>();

  constructor(public menuComponent:MenuComponent){}

  getTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  closePopup(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.closePopupEvent.emit();  // Emet un événement pour fermer la popup
  }

  validateCart() {
    // Implémentation de la validation du panier ici
    localStorage.clear();
    this.closePopup();  // Ferme le popup après validation
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
}

