import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';

export const routes: Routes = [    
    { path: '', component: HomeComponent},
    { path: 'menu', component: MenuComponent},
    { path: 'table-reservation', component: TableReservationComponent }
];
