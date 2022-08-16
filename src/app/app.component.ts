import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Item } from './model/item.model';
import { ApiService } from './service/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'plasma';
  cart$!: Observable<Item[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.cart$ = this.apiService.cart$;
  }

}
