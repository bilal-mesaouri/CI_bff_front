import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private numberOfCustomers: number = 0;
  private tablecompteur: number = 0;
  private order: any;
  private table: any;
  private clientsNumber: number = 1;
  private menuName: string = '';

  constructor() { }
  // Setter method to update the number of people
  setNumberOfPeople(count: number): void {
    this.numberOfCustomers = count;
  }

  // Getter method to retrieve the number of people
  getNumberOfPeople(): number {
    return this.numberOfCustomers;
  }

  setTable(table: any) {
    this.table = table;
  }

  setOrder(order: any) {
    this.order = order;
  }

  getTable() {
    return this.table;
  }

  getOrder() {
    return this.order;
  }

  setClientNumber(client: number) {
    this.clientsNumber = client;
  }

  getClientNumber() {
    return this.clientsNumber;
  }

  getTableCompteur() {
    return this.tablecompteur;
  }

  setTableCompteur(tablecompteur: number) {
    this.tablecompteur = tablecompteur;
  }

  incrementClient() {
    this.clientsNumber++;
    console.log('Client number', this.clientsNumber);
    let numberOfClients = this.table.clients.length;
    console.log('Number of clients', numberOfClients);
    if (this.clientsNumber > numberOfClients) {
      this.clientsNumber = 1;
      this.incrementTable();
    }
  }

  incrementTable() {
    this.tablecompteur++;
    if (this.tablecompteur >= this.order.tables.length) {
      this.tablecompteur = 0;
    }
  }

  setMenuName(menuName: string) {
    this.menuName = menuName;
  }

  getMenuName() {
    return this.menuName;
  }
}
