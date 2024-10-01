import {Cart} from "./Cart";

export interface TableOrder {
  orderNumber: number;
  tableNumber: number;
  cart: Cart;
}
