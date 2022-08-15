import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ApiService } from '../service/api.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-list-checkout',
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.css']
})
export class ListCheckoutComponent implements OnInit, OnDestroy {

  items: Item[] = [];
  total: number = 0;
  subscriptions$: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  clickRemove(idx: number): void {
    this.apiService.removeItem(idx);
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.apiService.getCart(this.items));
    this.subscriptions$.push(
        this.apiService.cart$.subscribe({
        next: (docs: Item[]) => this.items = docs,
        error: (err: Error) => console.error(err)
      })
    );
    this.subscriptions$.push(
      this.apiService.total$.subscribe({
      next: (total: number) => this.total = total,
      error: (err: Error) => console.error(err)
    })
  );
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
