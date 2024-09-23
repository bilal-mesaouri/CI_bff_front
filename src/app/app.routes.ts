import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';

export const routes: Routes = [    
    { path: '', component: HomeComponent},
    { path: 'table-reservation', component: TableReservationComponent, data:{type:"reservation"}},
    { path: 'table-payment', component: TableReservationComponent, data:{type:"payment"} },
    { path: 'payment-method', component: PaymentMethodComponent },
];
