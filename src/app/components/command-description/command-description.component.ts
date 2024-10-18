import {ChangeDetectorRef, Component, inject, Inject, Input, OnChanges} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {StoreService} from "../../services/store.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";
import {buildApplication} from "@angular-devkit/build-angular";
import {copyCommandForCurrentClient, removeItemForClient} from "../../stores/command.action";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-command-description',
  standalone: true,
  imports: [
    MatCard,
    AsyncPipe,
    NgIf,
    NgForOf,
    MatCardContent,
    MatCardTitle,
    MatButton,
    MatCardActions,
    MatCardHeader
  ],
  templateUrl: './command-description.component.html',
  styleUrl: './command-description.component.scss'
})
export class CommandDescriptionComponent  {
  isDetailsDisplayed:boolean=false;
  copyIndex:number=-1;
  itemsToDisplay:Item[]=[]
  currentTable$:Observable<Table|null|undefined>=new Observable();

  constructor(   public dialogRef: MatDialogRef<CommandDescriptionComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any,private cdRef:ChangeDetectorRef,private store:StoreService) {
    this.currentTable$=this.store.select(selectTable(this.data.orderClient.commandNumber,this.data.orderClient.tableNumber));
}

close(): void {
    this.dialogRef.close();
  }

  openDetails(items: Item[],copyIndex:number) {
    this.isDetailsDisplayed=true;
    console.log("display",this.isDetailsDisplayed)
    this.itemsToDisplay=items
    this.copyIndex=copyIndex;
    console.log(items,"tt")
  }
  copyTheCommand(){
    this.store.dispatch(copyCommandForCurrentClient({ otherClientIndex:this.copyIndex  }));
    this.close();

  }
  cancel(){
    this.isDetailsDisplayed=false;
  }
}
