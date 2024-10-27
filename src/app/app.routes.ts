import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { MenuComponent } from './components/menu/menu.component';
import { EventMenuComponent } from './Event-management/components/event-menu/event-menu.component';
import { CustomerCountComponent } from './components/customer-count/customer-count.component';
import { HeaderComponent } from './components/header/header.component';
import { CategoryComponent } from './components/category/category.component';
import { TableCategoriesComponent } from './components/table-categories/table-categories.component';
import { PaymentReviewComponent } from './components/payment-review/payment-review.component';
import {CustomerCounterComponent} from './components/customer-counter/customer-counter.component';
import { EventHomeComponent } from './Event-management/components/event-home/event-home.component';
import { EventFormComponent } from './Event-management/components/event-form/event-form.component';
import { EventCustomerCountComponent } from './Event-management/components/event-customer-count/event-customer-count.component';
import { TableReservationEventComponent } from './Event-management/components/table-reservation-event/table-reservation-event.component';
import { MenuCreationComponent } from './Event-management/components/menu-creation/menu-creation.component';
import { MenuNameComponent } from "./Event-management/components/menu-name/menu-name.component";
import { CommunEventCartComponent } from './Event-management/components/commun-event-cart/commun-event-cart.component';

export const routes: Routes = [
  { path: '', component: EventHomeComponent},
  { path: 'event-form', component: EventFormComponent},
  { path: 'event-customer-count', component: EventCustomerCountComponent},
  { path: 'event-table-reservation', component: TableReservationEventComponent},
  { path: 'crate-menu', component: MenuCreationComponent},
  { path: 'event-menu', component: EventMenuComponent},
  { path: 'common-cart', component: CommunEventCartComponent},

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

];
