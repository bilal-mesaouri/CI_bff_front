import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerCountComponent } from './components/customer-count/customer-count.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { TableCategoriesComponent } from './components/table-categories/table-categories.component';
import { PaymentReviewComponent } from './components/payment-review/payment-review.component';
import {CustomerCounterComponent} from './components/customer-counter/customer-counter.component';

// Define the routes of the table
import { HomeTableComponent} from "./table/home-table/home-table.component";

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'table-reservation', component: TableReservationComponent, data:{type:"reservation"}},
    { path: 'table-payment', component: TableReservationComponent, data:{type:"payment"} },
    { path: 'table-categories',component: TableCategoriesComponent },
    { path: 'menu', component: MenuComponent},
    { path: 'table-reservation', component: TableReservationComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'payment-method/:commandId', component: PaymentMethodComponent },
    { path: 'payment-review/:orderId/:tableNumber', component: PaymentReviewComponent },
    { path: 'customer-count', component: CustomerCountComponent, data:{type:"customerCount"} },
    { path: 'orderId', component: CustomerCountComponent, data:{type:"orderId"} },
    { path: 'table-reservation', component: TableReservationComponent },
    { path: 'customer-counter', component: CustomerCounterComponent},
  { path: 'menu/starters', component: MenuComponent},
  { path: 'menu/desserts', component: MenuComponent},
  { path: 'menu/drinks', component: MenuComponent},
  { path: 'menu/main course', component: MenuComponent},
  { path: 'table-home', component: HomeTableComponent},


];
