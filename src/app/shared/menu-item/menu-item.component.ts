import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../model/MenuItem';
import { MenuComponent } from '../../components/menu/menu.component';


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Output() quantityChanged = new EventEmitter<{ itemId: string, quantity: number }>();  // Emet des infos sur l'item et la quantité

  constructor() {}


  increaseQuantity(item: any) {
    item.quantity += 1;
    this.quantityChanged.emit({itemId: item.id, quantity:item.quantity})
  }

  // Méthode pour diminuer la quantité
  decreaseQuantity(item: any) {
    if (item.quantity > 0) {
      item.quantity -= 1;
      this.quantityChanged.emit({itemId: item.id, quantity:item.quantity})
    }
  }

}
