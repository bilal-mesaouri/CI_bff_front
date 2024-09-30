import {Component, Input} from '@angular/core';
import {CategoryComponent} from "../category/category.component";

import {NgForOf} from "@angular/common";
import {HeaderComponent} from "../header/header.component";
import { Category } from '../../model/category';
import { CATEGORIES } from '../../../constants';

@Component({
  selector: 'app-table-categories',
  standalone: true,
  imports: [
    CategoryComponent,
    NgForOf,
    HeaderComponent
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss'
})
export class TableCategoriesComponent {
  @Input() tableNumber:number=3;
  @Input() personNumber:number=1;
  public  categories:Category[]=CATEGORIES;
  constructor() {
    console.log(this.categories)
  }
}
