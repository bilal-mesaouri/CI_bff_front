import {Component, OnInit ,ViewChild} from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Category} from "../../model/Category";
import {CATEGORIES} from "../../model/constants";
import {NgForOf} from "@angular/common";
import {RouterLink, Router} from "@angular/router"; // Import du Router
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HeaderComponent } from '../header/header.component';
//import { MenuComponent} from "../menu/menu.component";
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
  //@ViewChild(MenuComponent) menuComponent!: MenuComponent;
  //public Order: any;
  //public table: any;
  //public clientNumber: number=1;
  //public tablecompteur: number=0

  constructor(private router: Router, protected store:StoreService ) {}

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
    console.log('Cart',cart);

  }

  displayItemsByType(categoryTitle: string): void {
    this.router.navigate(['/menu', categoryTitle.toLowerCase()])
  }

  getOrder() {
    //this.Order = JSON.parse(<string>localStorage.getItem('tableOrder'));
    this.store.setOrder(JSON.parse(<string>localStorage.getItem('tableOrder')));
    console.log('Order',this.store.getOrder());
  }

  gettableByNumber() {
    this.store.setTable(this.store.getOrder().tables[this.store.getTableCompteur()]);
    console.log('Table',this.store.getTable());
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


}
