import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

import { Item } from '../model/item.model';
import { items } from '../model/data.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items = new ReplaySubject();

  constructor() { }

  getItems(): void {
    this.items.next(items);
  }

}
