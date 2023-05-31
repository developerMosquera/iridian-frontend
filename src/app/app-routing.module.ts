import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "events-list",
    loadChildren: () => import("./modules/events-list/events-list.module").then((m) => m.EventsListModule),
  },
  { path: "**", redirectTo: "events-list" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
