import {Component, Input} from '@angular/core';
import {CategoryComponent} from "../category/category.component";
import {Category} from "../../model/Category";
import {CATEGORIES} from "../../model/constants";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";

@Component({
  selector: 'app-table-categories',
  standalone: true,
  imports: [
    CategoryComponent,
    NgForOf,
    RouterLink,
    MatToolbarModule,
    MatButtonModule
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss'
})
export class TableCategoriesComponent {
  @Input() tableNumber:number=3;
  @Input() personNumber:number=1;
  public  categories:Category[]=CATEGORIES
  constructor() {
  }


}
