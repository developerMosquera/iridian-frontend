import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BetslipComponent } from '../betslip/betslip.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @Input() title: string;

  constructor(private readonly dialog: MatDialog) {
    this.title = "";
  }

  openDialog() {
    const dialogOpen = this.dialog.open(BetslipComponent, {
      width: '35%',
      height: '100%',
      position: { left: '65%', top: '0%', },
      panelClass: 'custom-dialog-container',
    });
  }
}
