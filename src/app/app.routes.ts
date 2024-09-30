import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { MenuComponent } from './components/menu/menu.component';
import { CustomerCountComponent } from './components/customer-count/customer-count.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { TableCategoriesComponent } from './components/table-categories/table-categories.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'table-reservation', component: TableReservationComponent, data:{type:"reservation"}},
    { path: 'table-payment', component: TableReservationComponent, data:{type:"payment"} },
    { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'table-categories', component: TableCategoriesComponent },
  { path: 'payment-method', component: PaymentMethodComponent },
  { path: 'menu', component: MenuComponent},
  { path: 'customer-counter', component: CustomerCountComponent},
  { path: 'table-reservation', component: TableReservationComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'category', component: CategoryComponent }
];
