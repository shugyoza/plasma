import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { ApiService } from '../service/api.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-list-checkout',
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.css']
})
export class ListCheckoutComponent implements OnInit, OnDestroy {

  items$!: Observable<Item[]>;
  total$!: Observable<number>;
  subscriptions$: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  clickRemove(idx: number): void {
    this.apiService.removeItem(idx);
  }

  checkout(): void {

  }

  ngOnInit(): void {
    this.items$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
