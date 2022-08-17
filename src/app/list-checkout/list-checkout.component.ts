import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, Observable, of, ReplaySubject } from 'rxjs';

import { ApiService } from '../service/api.service';
import { EmailService } from '../service/email.service';
import { Item } from '../model/item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-checkout',
  templateUrl: './list-checkout.component.html',
  styleUrls: ['./list-checkout.component.css']
})
export class ListCheckoutComponent implements OnInit, OnDestroy {
  cart$!: Observable<Item[]>;
  total$!: Observable<number>;
  subscriptions$: Subscription[] = [];

  constructor(
    private apiService: ApiService,
    private emailService: EmailService,
    private router: Router
    ) { }

  // initialize values before passing them to template
  ngOnInit(): void {
    this.cart$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }

  // method to remove an item from cart
  clickRemove(idx: number): void {
    this.apiService.removeItem(idx);
  }


  // method to write content of email to send to shopper
  writeEmail(): string {
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

    // initialize the above variables for us to create email content for purchase details
    this.subscriptions$.push(
      this.total$.subscribe({
        next: (n: number) => total = n,
        error: (err: Error) => console.error(err)
      })
    );
    this.subscriptions$.push(
      this.cart$.subscribe({
        next: (cart: Item[]) => list = cart,
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
      sales@plasma.com<br>`;

    return details;
  }


  // method to checkout
  checkout(emailInput: string): void {

    // if user give a valid email address, send them email
    if (emailInput && emailInput.length) {
      // assemble request body
      const body = {
        name: "Shopper",
        email: emailInput,
        content: this.writeEmail()
      }
      // call the API method to send email
      this.subscriptions$.push(
        this.emailService.sendEmail(body)
        .subscribe({
          next: (data: any) => console.log(data),
          error: (err: Error) => console.error(err)
        }
      ));
    }

    // Reset all the tracker variables and observables for shopping cart
    this.apiService.cart = [];
    this.apiService.total = 0;
    this.apiService.cart$ = new ReplaySubject<Item[]>();
    this.apiService.total$ = new ReplaySubject<number>(0);
    this.cart$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;

    this.router.navigate(['/']);
  }

}
