import {Component, OnInit } from '@angular/core';
import {CategoryComponent} from "../../../components/category/category.component";
import {Category} from "../../../model/Category";
import {CATEGORIES} from "../../../model/constants";
import {NgForOf} from "@angular/common";
import {RouterLink, Router} from "@angular/router"; // Import du Router
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
    MatButtonModule,
  ],
  templateUrl: './table-categories.component.html',
  styleUrl: './table-categories.component.scss'
})
export class TableCategoriesComponent implements OnInit {
  public  categories:Category[]=CATEGORIES

  constructor(private router: Router) {}

  ngOnInit() {
  }

  displayItemsByType(categoryTitle: string): void {
    this.router.navigate(['/menu', categoryTitle.toLowerCase()])
  }
}
