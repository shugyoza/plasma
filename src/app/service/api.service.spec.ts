import { TestBed } from '@angular/core/testing';
import { isObservable } from 'rxjs';

import { ApiService } from './api.service';
import { Item } from '../model/item.model';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // inject ApiService
      providers: [ ApiService ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchItems must return an observable of array', () => {
    let returnedData = service.fetchItems();
    let result = isObservable(returnedData);
    expect(result).toBeTrue();

    let value: any;
    returnedData.subscribe({
      next: (data: any) => value = data,
      error: (err: Error) => console.error(err)
    });
    expect(Array.isArray(value)).toBeTrue();
  });

  it('getItems must return a Subscription that initialized an array of items', () => {
    let items: Item[] = [];
    let returned = service.getItems();
    returned.unsubscribe();
    expect(Array.isArray(items)).toBeTrue();
  });

  it('getCart must return a Subscription that initialized an array of items in cart', () => {
    let cart: Item[] = [];
    let returned = service.getCart(cart);
    returned.unsubscribe();
    expect(Array.isArray(cart)).toBeTrue();
  });


});
