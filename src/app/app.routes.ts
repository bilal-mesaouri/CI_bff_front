import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TableReservationComponent } from './components/table-reservation/table-reservation.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { PaymentReviewComponent } from './components/payment-review/payment-review.component';
import { CustomerCountComponent } from './components/customer-count/customer-count.component';
export const routes: Routes = [    
    { path: '', component: HomeComponent},
    { path: 'table-reservation', component: TableReservationComponent, data:{type:"reservation"}},
    { path: 'table-payment', component: TableReservationComponent, data:{type:"payment"} },
    { path: 'payment-method/:commandId', component: PaymentMethodComponent },
    { path: 'payment-review/:orderId/:tableNumber', component: PaymentReviewComponent },
    { path: 'customer-count', component: CustomerCountComponent },


];
