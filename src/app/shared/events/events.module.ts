import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { EventsComponent } from './events.component';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, MatGridListModule, MatCardModule],
  exports: [EventsComponent]
})
export class EventsModule {}
