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
  private cart: any = {
    STARTER: null,
    MAIN: null,
    DESSERT: null,
    BEVERAGES: []
  }

  constructor() {
    this.loadCartFromLocalStorage();
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }


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

  getCart() {
    console.log('get cart in the store:', this.cart);
    return this.cart;
  }

  clearCart() {
    this.cart = {
      STARTER: null,
      MAIN: null,
      DESSERT: null,
      BEVERAGES: []
    }
    this.saveCartToLocalStorage();
  }

  setCartBeverages(BEVERAGES: any[]) {
    this.cart.BEVERAGES = BEVERAGES;
    this.saveCartToLocalStorage();
  }

  setCartItems(item: any, category: string) {
    this.cart[category] = item;
    this.saveCartToLocalStorage();
  }

  removeItem(item: any) {
    console.log('Removing item:', item);
    console.log('Cart:', this.cart.BEVERAGES);
    console.log('Category:', item._id);

    this.cart.BEVERAGES = this.cart.BEVERAGES.filter((beverage: any) => beverage._id != item._id);

    console.log('Cart after removing:', this.cart.BEVERAGES);
    this.saveCartToLocalStorage();
  }
}
