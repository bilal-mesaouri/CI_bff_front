import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {Router} from "@angular/router";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-central-screen',
  standalone: true,
  imports: [
    FormsModule,
    MatCard,
    MatCardContent,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    NgStyle
  ],
  templateUrl: './central-screen.component.html',
  styleUrl: './central-screen.component.css'
})
export class CentralScreenComponent {

  rotation: number = 0;
  constructor(private router: Router) {}
  navigateToReservation() {
    this.router.navigate(['/event-form']);
  }
  rotateCard() {
    this.rotation += 90; // Increase rotation angle by 45 degrees
    if (this.rotation >= 360) {
      this.rotation = 0; // Reset to 0 after a full rotation
    }
  }

}
