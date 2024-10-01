import {Component, OnInit ,ViewChild} from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Category} from "../../model/Category";
import {CATEGORIES} from "../../model/constants";
import {NgForOf} from "@angular/common";
import {RouterLink, Router} from "@angular/router"; // Import du Router
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import { HeaderComponent } from '../header/header.component';
import { MenuComponent} from "../menu/menu.component";
import internal from "node:stream";

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
  @ViewChild(MenuComponent) menuComponent!: MenuComponent;
  public Order: any;
  public table: any;
  public clientNumber: number=1;
  public tableNumber: number | undefined;
  public tablecompteur: number=0

  constructor(private router: Router) {}

  ngOnInit() {

    this.getOrder();
    this.gettableByNumber();
    this.tableNumber= this.table.tableNumber;
    let cart ={
      orderNumber: this.Order.commandId,
      clientNumber: this.clientNumber,
      tableNumber: this.tableNumber,
      items: []
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart',cart);

  }

  displayItemsByType(categoryTitle: string): void {
    this.router.navigate(['/menu', categoryTitle.toLowerCase()])
  }

  getOrder() {
    this.Order = JSON.parse(<string>localStorage.getItem('tableOrder'));
    console.log('Order',this.Order);
  }

  gettableByNumber() {
    this.table=this.Order.tables[this.tablecompteur];
  }

  getClientByNymber() {
    return this.table.clients.find((client: any) => client.client === this.clientNumber);
  }

  incrementClient() {
    this.clientNumber++;
    let numberOfClients = this.table.clients.length;
    if (this.clientNumber > numberOfClients) {
      this.clientNumber = 1;
      this.incrementTable();
    }
  }

  incrementTable() {
    this.tablecompteur++;
    if (this.tablecompteur > this.Order.tables.length) {
      this.tablecompteur = 0;
    }
  }


}
