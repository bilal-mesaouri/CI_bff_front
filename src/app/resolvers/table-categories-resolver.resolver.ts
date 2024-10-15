import { ResolveFn } from '@angular/router';
import {inject} from "@angular/core";
import {StoreService} from "../services/store.service";
import {of} from "rxjs";


export const tableCategoriesResolverResolver: ResolveFn<any> = (route, state) => {
  let store =inject(StoreService);
  const order = JSON.parse(<string>localStorage.getItem('tableOrder'));
  store.setOrder(order);
  const table = order.tables[store.getTableCompteur()];
  store.setTable(table);
  return of({ order, table });

};

