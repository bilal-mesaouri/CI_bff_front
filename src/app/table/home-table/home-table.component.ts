import { Component } from '@angular/core';
import {TopLeftComponent} from "../top-left/top-left.component";
import {TopRightComponent} from "../top-right/top-right.component";
import {CenterComponent} from "../center/center.component";
import {BotLeftComponent} from "../bot-left/bot-left.component";
import {BotRightComponent} from "../bot-right/bot-right.component";

@Component({
  selector: 'app-home-table',
  standalone: true,
  imports: [
    TopLeftComponent,
    TopRightComponent,
    CenterComponent,
    BotLeftComponent,
    BotRightComponent
  ],
  templateUrl: './home-table.component.html',
  styleUrl: './home-table.component.css'
})
export class HomeTableComponent {

}
