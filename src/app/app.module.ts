import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './shared/item/item.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { ListCheckoutComponent } from './list-checkout/list-checkout.component';
import { ApiService } from './service/api.service';

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
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
