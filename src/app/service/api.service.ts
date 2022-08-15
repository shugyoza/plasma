import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Item } from '../model/item.model';
import { items } from '../model/data.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }

  getItems(): Observable<Item[]> {
    return of(items);
  }

}
