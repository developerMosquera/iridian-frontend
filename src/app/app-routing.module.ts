import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "events-list",
    loadChildren: () => import("./modules/events-list/events-list.module").then((m) => m.EventsListModule),
  },
  {
    path: "contact",
    loadChildren: () => import("./modules/contact/contact.module").then((m) => m.ContactModule),
  },
  { path: "**", redirectTo: "events-list" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
