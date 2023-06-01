import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { IApi, IApiMarkets, IApiSelections } from '../../interfaces/api.interface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit, OnDestroy {
  breakpoint = 2;
  resolutionValidate = 450;
  events: Array<IApi> = [];
  itemLocalStorage = 'betslip';
  inactiveColor = 'rgb(214, 214, 214)';
  activeColor = 'rgb(129, 216, 155)';
  private subscribeUpdateEvents: any;

  constructor(private readonly restService: RestService) {}

  ngOnInit() {
    this.validateBreakpoint(false);
    this.getData();
    this.onUpdateEvents();
  }

  onUpdateEvents() {
    this.subscribeUpdateEvents = this.restService.updateEvents$.subscribe((data: boolean) => {
      if (data) {
        this.getData();
      }
    });
  }

  onResize(event: any) {
    this.validateBreakpoint(event);
  }

  validateBreakpoint(event: any) {
    const rows = this.events.length > 2 ? 3 : 2;
    if (event) {
      this.breakpoint = (event.target.innerWidth <= this.resolutionValidate) ? 1 : rows;
    } else {
      this.breakpoint = (window.innerWidth <= this.resolutionValidate) ? 1 : rows;
    }
  }

  getData() {
    this.restService.get()
      .subscribe({
        next: (response) => this.extractData(response),
        complete: () => this.validateBreakpoint(false),
      })
  }

  async extractData(response: Array<IApi>) {
    const events = response.filter(item => item.markets.length > 0);
    const selectedEvents = await this.validationSelectedEvents(events);
    this.events = selectedEvents;
  }

  async validationSelectedEvents(events: Array<IApi>): Promise<Array<IApi>> {
    const betslip = await this.restService.getBetslip(this.itemLocalStorage);
    events.map((item) => {
      item.markets.map((market) => {
        market.selections?.map((selection) => {
          const selectionStorage = betslip.find((selectionStorage: any) => selectionStorage.selection.id === selection.id);
          if (selectionStorage) {
            return selection.color = this.activeColor;
          }

          return selection.color = this.inactiveColor;
        })
      })
    });

    return events
  }

  getColumnCount(amount: any) {
    const column = (amount.length > 2) ? 3 : 2;
    return column;
  }

  selectedMarket(event: IApi, market: IApiMarkets, selection: IApiSelections) {
    const dataSaveStorage = { event: event, market: market, selection: selection };
    const saveSuccess = this.restService.saveBetslip(this.itemLocalStorage, dataSaveStorage);
    if (saveSuccess) {
      return selection.color = this.activeColor;
    }

    return selection.color = this.inactiveColor;
  }

  ngOnDestroy() {
    this.subscribeUpdateEvents.unsubscribe();
  }
}
