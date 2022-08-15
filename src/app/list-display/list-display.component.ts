import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

import { ApiService } from '../service/api.service';
import { Item } from '../model/item.model';

@Component({
  selector: 'app-list-display',
  templateUrl: './list-display.component.html',
  styleUrls: ['./list-display.component.css']
})
export class ListDisplayComponent implements OnInit {
  items: Item[] = [];
  subscriptions$: Subscription[] = [];

  constructor(private apiService: ApiService) { }

  getItems(): void {
    const subscription$ = this.apiService.getItems()
    .subscribe({
      next: (items: Item[]) => this.items = items,
      error: (err: Error) => console.error(err)
    });
    this.subscriptions$.push(subscription$);
  }

  ngOnInit(): void {
    this.getItems();
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
