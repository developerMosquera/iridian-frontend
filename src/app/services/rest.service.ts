import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IApi, IBetslip } from '../interfaces/api.interface';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private urlApi = 'http://www.mocky.io/v2/59f08692310000b4130e9f71';
  private updateEventsSubject: Subject<boolean> = new Subject<boolean>();
  public updateEvents$: Observable<boolean> = this.updateEventsSubject.asObservable();

  constructor(private readonly http: HttpClient) {}

  get(): Observable<Array<IApi>> {
    return this.http.get<Array<IApi>>(this.urlApi);
  }

  public saveBetslip(key: string, data: any): void {
    let betslip = [];
    const existingDataForKey = localStorage.getItem(key);
    if (existingDataForKey) {
      betslip = JSON.parse(existingDataForKey);
      betslip.push(data);
    } else {
      betslip.push(data);
    }

    localStorage.setItem(key, JSON.stringify(betslip));
  }

  public getBetslip(key: string) {
    let betslip = [];
    const existingDataForKey = localStorage.getItem(key);
    if (existingDataForKey) {
      betslip = JSON.parse(existingDataForKey);
    }

    return betslip;
  }

  public deleteBetslip(key: string, id: string) {
    const getBetslip = this.getBetslip(key);
    const betslip = getBetslip.filter((item: IBetslip) => item.selection.id !== id);
    localStorage.setItem(key, JSON.stringify(betslip));
    this.updateEvents();
  }

  updateEvents() {
    this.updateEventsSubject.next(true);
  }
}
