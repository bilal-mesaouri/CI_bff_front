import { Component, OnInit } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {Category} from "../../../model/Category";
import {CATEGORIES} from "../../../model/constants";
import {CategoryComponent} from "../../../components/category/category.component";
import {NgForOf} from "@angular/common";
import { EventMenuComponent } from '../event-menu/event-menu.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule, RouterLink, CategoryComponent, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public  categories:Category[]=CATEGORIES
  constructor( public menuComponent: EventMenuComponent) {
  }

  ngOnInit() {
    //this.displayItemsByTypeAdapter();
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

  displayItemsByTypeAdapter(): void {
    const url = window.location.href;
    let category = url.split('/').pop();
    if (category !== undefined) {

      category=category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      console.log(category);
      this.displayItemsByType(category);
    }else {
      this.menuComponent.displayAllItems();
    }
  }


}
