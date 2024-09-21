import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { CustomerCountComponent} from './components/customer-count/customer-count.component';


export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'customer-counter', component: CustomerCountComponent},
    { path: 'table-reservation', component: TableReservationComponent }
];
