import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private numberOfCustomers: number = 0;

  constructor() { }
  // Setter method to update the number of people
  setNumberOfPeople(count: number): void {
    this.numberOfCustomers = count;
  }

  // Getter method to retrieve the number of people
  getNumberOfPeople(): number {
    return this.numberOfCustomers;
  }
}
