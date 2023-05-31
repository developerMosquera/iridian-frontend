import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsListRoutingModule } from './events-list-routing.module';
import { NavbarModule } from '../../shared/navbar/navbar.module';
import { BetslipModule } from '../../shared/betslip/betslip.module';
import { EventsModule } from '../../shared/events/events.module'
import { EventsListComponent } from './events-list.component';


@NgModule({
  declarations: [
    EventsListComponent
  ],
  imports: [
    CommonModule,
    EventsListRoutingModule,
    NavbarModule,
    BetslipModule,
    EventsModule
  ]
})
export class EventsListModule { }
