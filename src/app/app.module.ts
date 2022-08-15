import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './item/item.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { ListCheckoutComponent } from './list-checkout/list-checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ListDisplayComponent,
    ListCheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
