import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreateEventService {

  constructor(private http: HttpClient) {
  }

  getEvent() {
    return this.http.get('http://localhost:3003/event');
  }

  createMenu(event: any) {
    return this.http.post('http://localhost:3003/event/menu', event);
  }

  removeMenu(menuToRemove: any) {
    return this.http.delete('http://localhost:3003/event/menu/' + menuToRemove.name);
  }

  removeItem(item: any) {
    console.log('Delete item:', item._id);
    return this.http.delete('http://localhost:3003/event/drink/' + item._id);
  }

  validate() {
    console.log('menusData:');
    return this.http.get('http://localhost:3003/event/validate');
  }

  getMenus(menu: any) {
    return this.http.get('http://localhost:3003/event/menus'+ menu.name);
  }
}

