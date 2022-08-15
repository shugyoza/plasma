import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListDisplayComponent } from './list-display/list-display.component';
import { ListCheckoutComponent } from './list-checkout/list-checkout.component';

const routes: Routes = [
  {
    path: 'items',
    component: ListDisplayComponent
  },
  {
    path: 'checkout',
    component: ListCheckoutComponent
  },
  {
    path: '',
    redirectTo: '/items',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
