import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, of, ReplaySubject } from 'rxjs';

import { ApiService } from '../service/api.service';
import { EmailService } from '../service/email.service';
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

  constructor(
    private apiService: ApiService,
    private emailService: EmailService
    ) { }

  clickRemove(idx: number): void {
    this.apiService.removeItem(idx);
  }

  checkout(emailInput: Event): void {
    // create email content's intro
    let details = `Hi!
                  <br><br>
                  Thank you for shopping with us.
                  <br>
                  You have just bought:
                  <br><br>`;

    let total = 0;
    let itemsQuantity = 0
    let list: Item[] = [];

    // populate the above variable for us to create email content for purchase details
    this.subscriptions$.push(
      this.total$.subscribe({
        next: (n: number) => total = n,
        error: (err: Error) => console.error(err)
      })
    );
    this.subscriptions$.push(
      this.items$.subscribe({
        next: (items: Item[]) => list = items,
        error: (err: Error) => console.error(err),
      })
    );

    // create the purchase details in the email content
    list.forEach((item: Item) => {
        itemsQuantity += item.quantity;
        details += `
          ${item.quantity} pc(s) of ${item.title} at
          ${(item.price / 100).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}/pc =
          ${((item.price * item.quantity) / 100).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}
          <hr>`
    });

    // create the closure in the email content
    details += `
      Total: ${(total).toLocaleString('us-US', { style: 'currency', currency: 'USD' })} for ${itemsQuantity} item(s).
      <br><br>
      Sincerely,<br>
      Plasma Team<br>
      (123)345-7890<br>
      sales@plasma.com<br>
      `;

    // assemble request body, and call the API method to send email
    const body = {
      name: "Test",
      email: emailInput,
      content: details
    }
    this.subscriptions$.push(this.emailService.sentEmail(body));

    // Reset all the tracker variables and observables for shopping cart
    this.apiService.cart = [];
    this.apiService.total = 0;
    this.apiService.cart$ = new ReplaySubject<Item[]>();
    this.apiService.total$ = new ReplaySubject<number>(0);
    this.items$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;
  }

  ngOnInit(): void {
    // initialize values before passing them to template
    this.items$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
