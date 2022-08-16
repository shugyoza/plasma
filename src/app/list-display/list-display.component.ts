import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { ApiService } from '../service/api.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit, OnDestroy {
  items$!: Observable<Item[]>;
  subscriptions$: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    // call backend to initialize values in the service
    this.subscriptions$.push(this.apiService.getItems());
    // store observable in local variable before displaying it in template
    this.items$ = this.apiService.items$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }

  // method to add an item to cart
  clickAdd(idx: number): void {
    this.apiService.addToCart(idx);
  }

}
