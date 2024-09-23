import { Routes } from '@angular/router';
import { HomeComponent } from './borne-restaurant/components/home/home.component';
import { TableReservationComponent } from './borne-restaurant/components/table-reservation/table-reservation.component';
import { CustomerCountComponent} from './borne-restaurant/components/customer-count/customer-count.component';
import { MenuComponent } from './borne-restaurant/components/menu/menu.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'customer-counter', component: CustomerCountComponent},
    { path: 'table-reservation', component: TableReservationComponent },
  { path: 'menu', component: MenuComponent }

];
