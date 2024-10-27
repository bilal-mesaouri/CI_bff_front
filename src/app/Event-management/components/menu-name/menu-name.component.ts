import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-menu-name',
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel
  ],
  templateUrl: './menu-name.component.html',
  styleUrl: './menu-name.component.css'
})
export class MenuNameComponent {

  menuName: string = '';

  constructor(private router: Router, private store: StoreService) {
  }

  onSubmit() {
    if (this.menuName === '') {
      alert('Please enter a name for your menu');
    }else {
      this.store.setMenuName(this.menuName);
      this.router.navigate(['/event-menu'])
    }
  }


}
