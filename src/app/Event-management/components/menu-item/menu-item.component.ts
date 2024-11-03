import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem2 } from '../../../model/MenuItem2';
import { CreateEventService } from '../../../services/create-event.service';
import { StoreService} from "../../../services/store.service";


@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit {
  @Input() item!: MenuItem2;
  @Output() itemClicked = new EventEmitter<MenuItem2>();
  @Output() deleteItem = new EventEmitter<void>();
  @Input() isDrinksVisible: boolean = false;
  @Input() centralTable: boolean = false;
  @Input() isNotEvent:boolean=false;
  @Output() quantityChanged = new EventEmitter<{ itemId: string, quantity: number }>();  // Emet des infos sur l'item et la quantité

  constructor(public createEventService: CreateEventService,public storeService:StoreService) { }

  onDelete(item: any) {
      this.createEventService.removeItem(item).subscribe({
        next: (data) => {
          this.deleteItem.emit(item);
        }
      });

  }

  ngOnInit() {

  }

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

  remove(item: MenuItem2) {
   this.storeService.removeItem(item);
  }
}
