import { Component } from '@angular/core';
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatGridList, MatGridTile} from "@angular/material/grid-list";
import {MatIcon} from "@angular/material/icon";
import {CentralScreenComponent} from "../central-screen/central-screen.component";
import {MenuNameComponent} from "../menu-name/menu-name.component";



@Component({
  selector: 'app-menu-creation',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatGridList,
    MatGridTile,
    MatIcon,
    CentralScreenComponent,
    MenuNameComponent,
  ],
  templateUrl: './menu-creation.component.html',
  styleUrl: './menu-creation.component.css'
})
export class MenuCreationComponent {

}
