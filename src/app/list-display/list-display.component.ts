import { Component, OnInit, OnDestroy } from '@angular/core';
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

  clickAdd(idx: number): void {
    this.apiService.addToCart(idx);
  }

  ngOnInit(): void {
    this.subscriptions$.push(this.apiService.getItems());
    this.items$ = this.apiService.items$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
