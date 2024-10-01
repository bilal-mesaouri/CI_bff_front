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
  public tablecompteur: number=0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.getcommand();
    this.gettableByNumber();
    this.tableNumber= this.table.tableNumber;
  }

  displayItemsByType(categoryTitle: string): void {
    this.router.navigate(['/menu', categoryTitle.toLowerCase()])
  }

  getcommand() {
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
    if (this.clientNumber > 4) {
      this.clientNumber = 1;
    }
  }

  incrementTable() {
    this.tablecompteur++;
    if (this.tablecompteur > this.Order.tables.length) {
      this.tableNumber = 1;
    }
  }


}
