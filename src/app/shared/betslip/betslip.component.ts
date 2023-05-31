import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RestService } from '../../services/rest.service';
import { IBetslip, IBetslipList } from '../../interfaces/api.interface';

@Component({
  selector: 'app-betslip',
  templateUrl: './betslip.component.html',
  styleUrls: ['./betslip.component.scss']
})
export class BetslipComponent implements OnInit {
  itemLocalStorage = 'betslip';
  betslipList: Array<IBetslipList> = [];

  constructor(public dialogOpen: MatDialogRef<BetslipComponent>, private readonly restService: RestService) {}

  ngOnInit() {
    this.getBetslip();
  }

  closeDialog() {
    this.dialogOpen.close();
  }

  async getBetslip() {
    const betslip = await this.restService.getBetslip(this.itemLocalStorage);
    this.extractList(betslip);
  }

  extractList(betslip: Array<IBetslip>) {
    this.betslipList = [];
    betslip.forEach((element: IBetslip) => {
      const row: IBetslipList = {
        id: element.selection.id,
        team: element.selection.name,
        marketName: element.market.name,
        price: element.selection.price,
      };

      this.betslipList.push(row);
    });
  }

  async deleteSelection(item: IBetslipList) {
    await this.restService.deleteBetslip(this.itemLocalStorage, item.id);
    this.getBetslip();
  }
}
