import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CI_bff_front';
  routesWithoutNavBar = ['/','/event-form','/event-customer-count','/event-table-reservation','/crate-menu','/event-menu','/common-cart']
  constructor(private router: Router){}

  addNavBar(){
    return !this.routesWithoutNavBar.includes(this.router.url);
  }
}
