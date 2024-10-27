import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuItem2 } from '../../../model/MenuItem2';


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

  constructor() {
  }

  ngOnInit() {

  }


}
