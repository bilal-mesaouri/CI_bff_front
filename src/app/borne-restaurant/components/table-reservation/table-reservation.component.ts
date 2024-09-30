import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from "@angular/material/card";
import { MatCheckbox } from "@angular/material/checkbox";
import { NgForOf } from "@angular/common";
import { CommonModule } from '@angular/common';
import { TableComponent } from '../../shared/table/table.component';
import { Table } from '../../model/model';
import { StoreService } from '../../services/store.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuServiceService } from '../../services/menu-service.service';

@Component({
  selector: 'app-table-reservation',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatCheckbox,
    TableComponent,
    NgForOf,
    CommonModule,
    FormsModule
  ],
  templateUrl: './table-reservation.component.html',
  styleUrls: ['./table-reservation.component.css'] // Use styleUrls, not styleUrl
})
export class TableReservationComponent {
  serverLink: string = "http://localhost:9500/";

  tables: Table[] = [] as Table[];

  numberOfCustomers: number = 0;
  numberOfTables: number = 0;
  selectedCount: number = 0;

  constructor(private http: HttpClient, private storeService: StoreService,private router: Router,private menuServiceService: MenuServiceService ) {}

  ngOnInit(): void {
    this.http.get<Table[]>(this.serverLink + "dining/tables").subscribe({
      next: (response: Table[]) => {
        this.tables = response;
        console.log(response);
      },
      error: (error: any) => {
        console.log("eroooooor", error);
      }
    });

    this.numberOfCustomers = this.storeService.getNumberOfPeople();
    this.numberOfTables = Math.ceil(this.numberOfCustomers / 4);
  }

  onSelectionChange() {
    this.selectedCount = this.tables.filter(table => table.selected).length;
  }
  navigateToNextPage() {
   this.createOrder();
    this.router.navigate(['/menu']);
  }
  createOrder() {
    // Appel du service avec un numéro de table et un nombre de clients
    this.menuServiceService.createTableOrder(12, 1) // Exemple avec tableNumber: 1, customersCount: 1
      .subscribe(
        response => {
          console.log('Réponse du serveur:', response);  // Afficher la réponse du backend
        },
        error => {
          console.error('Erreur:', error);  // Gérer l'erreur
        }
      );
  }
}
