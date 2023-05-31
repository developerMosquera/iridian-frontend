import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { BetslipComponent } from './betslip.component';

@NgModule({
  declarations: [BetslipComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule
  ],
  exports: [BetslipComponent],
})
export class BetslipModule { }
