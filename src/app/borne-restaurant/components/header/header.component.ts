import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";

import {CategoryComponent} from "../category/category.component";
import {NgForOf} from "@angular/common";
import { MenuComponent } from '../menu/menu.component';
import { Category } from '../../model/category';
import { CATEGORIES } from '../../../constants';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule, RouterLink, CategoryComponent, NgForOf],  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public  categories:Category[]=CATEGORIES

  constructor( public menuComponent: MenuComponent) {
  }

  displayItemsByType(categoryTitle: string): void {
    switch (categoryTitle) {
      case 'Starters':
        this.menuComponent.displayItemsByType('STARTER');
        break;
      case 'Main Course':
        this.menuComponent.displayItemsByType('MAIN');
        break;
      case 'Drinks':
        this.menuComponent.displayItemsByType('BEVERAGE');
        break;
      case 'Desserts':
        this.menuComponent.displayItemsByType('DESSERT');
        break;
      default:
        this.menuComponent.displayAllItems();
    }
  }

}
