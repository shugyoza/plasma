import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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

  checkout(): void {
    const body = {
      name: "hanjaya can dance",
      email: "transenid@gmail.com",
      content: "Brooaoaoaooaohao"
    }
    this.subscriptions$.push(this.emailService.sentEmail(body));
  }

  ngOnInit(): void {
    this.items$ = this.apiService.cart$;
    this.total$ = this.apiService.total$;
  }

  ngOnDestroy(): void {
    this.subscriptions$.forEach(subscription => subscription.unsubscribe);
  }
}
