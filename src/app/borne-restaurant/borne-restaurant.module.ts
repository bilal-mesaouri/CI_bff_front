import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerCountComponent } from '../components/customer-count/customer-count.component';
import { HomeComponent } from '../components/home/home.component';
import { TableReservationComponent } from '../components/table-reservation/table-reservation.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,CustomerCountComponent,HomeComponent,TableReservationComponent,FormsModule,ButtonModule
  ]
})
export class BorneRestaurantModule { }
