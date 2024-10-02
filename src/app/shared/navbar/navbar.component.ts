import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private location: Location, private router: Router) {}

  goBack() {
    this.location.back();
  }

  goHome() {
    this.router.navigate(['/home']);
  }
}
