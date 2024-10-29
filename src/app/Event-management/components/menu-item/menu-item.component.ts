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


  remove(item: MenuItem2) {
   this.storeService.removeItem(item);
  }
}
