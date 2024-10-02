import {Component, OnInit } from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Category} from "../../model/Category";
import {CATEGORIES} from "../../model/constants";
import {NgForOf} from "@angular/common";
import {RouterLink, Router} from "@angular/router"; // Import du Router
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-table-categories',
  standalone: true,
  imports: [
    CategoryComponent,
    NgForOf,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss'
})
export class TableCategoriesComponent implements OnInit {
  public  categories:Category[]=CATEGORIES

  constructor(private router: Router, protected store:StoreService) {}

  ngOnInit() {
    this.getOrder();
    this.gettableByNumber();
    let cart ={
      orderNumber: this.store.getOrder().commandId,
      clientNumber: this.store.getClientNumber(),
      tableNumber: this.store.getTable().tableNumber,
      items: []
    }
    localStorage.setItem('cart', JSON.stringify(cart));

    //this.reload();
  }

  displayItemsByType(categoryTitle: string): void {
    this.router.navigate(['/menu', categoryTitle.toLowerCase()])
  }

  getOrder() {
    this.store.setOrder(JSON.parse(<string>localStorage.getItem('tableOrder')));
  }

  gettableByNumber() {
    this.store.setTable(this.store.getOrder().tables[this.store.getTableCompteur()]);
  }

  getClientByNymber() {
    return this.store.getTable().clients.find((client: any) => client.client === this.store.getClientNumber());
  }

  clientNumber() {
    return this.store.getClientNumber();
  }

  tableNumber() {
    return this.store.getTable().tableNumber;
  }

  reload() {

    const isReloaded = localStorage.getItem('isReloaded');
    console.log('isReloaded', isReloaded);
    if (!isReloaded) {
      console.log('Reloading');
      setTimeout(() => {
        localStorage.setItem('isReloaded', 'true');
        window.location.reload();
        console.log('Reloaded');
      }, 5);
    } else {
      console.log('Not reloading');
      localStorage.removeItem('isReloaded');
    }
  }

}
