import { Injectable } from '@angular/core';
import { Subscription, ReplaySubject } from 'rxjs';

import { Item } from '../model/item.model';
import { items } from '../model/data.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  items: Item[] = [];
  cart: Item[] = [];
  total: number = 0;

  items$ = new ReplaySubject<Item[]>();
  cart$ = new ReplaySubject<Item[]>();
  total$ = new ReplaySubject<number>(0)

  constructor() { }

  fetchItems(): ReplaySubject<Item[]> {
    this.items$.next(items);
    return this.items$;
  }

  getItems(): Subscription {
    this.fetchItems();
    return this.items$
    .subscribe({
      next: (items: Item[]) => this.items = items,
      error: (err: Error) => console.error(err)
    });
  }

  addToCart(idx: number): void {
    // if there is no stock, just return
    if (this.items[idx].quantity === 0) return;

    this.total += this.items[idx].price;
    this.total$.next(this.total);

    // if there is stock, decrement the stock, and update the subject
    this.items[idx].quantity--;
    this.items$.next(this.items);

    // if cart is empty, just add this new item, and reduce the stock amount
    if (!this.cart.length) {
      this.cart = [ {...this.items[idx], quantity: 1} ];
      this.cart$.next(this.cart);
    }
    else {
      let added = this.cart.find((doc: Item) => doc.id === this.items[idx].id);
      // if item has not been in the cart, add this single item to the cart
      if (!added) this.cart = [...this.cart, {...this.items[idx], quantity: 1} ];
      // if this item has been in the cart, just update the quantity in the cart
      else added.quantity++;
      // update the subject
      this.cart$.next(this.cart);
    }
  }

  getCart(cart: Item[]): Subscription {
    return this.cart$
    .subscribe({
      next: (items: Item[]) => cart = items,
      error: (err: Error) => console.error(err)
    });
  }

  removeItem(idx: number): void {

    // return the quantity from cart back to the stock and update subject
    let newList = [];
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id === this.cart[idx].id) {
        this.items[i].quantity += this.cart[idx].quantity;
        newList.push(this.items[i]);
      }
      else newList.push(this.items[i]);
    }
    this.items = newList;
    this.items$.next(newList);

    // adjust the total
    this.total -= (this.cart[idx].quantity * this.cart[idx].price);
    this.total$.next(this.total);

    // remove the item from cart
    this.cart = this.cart.filter((doc: Item, i: number) => i !== idx);
    this.cart$.next(this.cart);

  }
}
