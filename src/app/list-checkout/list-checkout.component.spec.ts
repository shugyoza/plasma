import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from '../service/api.service';
import { EmailService } from '../service/email.service';

import { ListCheckoutComponent } from './list-checkout.component';
import { ItemComponent } from '../shared/item/item.component';
import { EmailFormComponent } from './email-form/email-form.component';

describe('ListCheckoutComponent', () => {
  let component: ListCheckoutComponent;
  let fixture: ComponentFixture<ListCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCheckoutComponent, ItemComponent, EmailFormComponent ],
      providers: [ ApiService, EmailService ],
      // RouterTestingModule to take place of Router for testing
      // HttpClientModule for testing
      imports: [ RouterTestingModule, HttpClientModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('writeEmail() must return a string for email content', () => {
    let result = component.writeEmail();
    expect(typeof result === 'string').toBeTrue();
    expect(result.length).toBeGreaterThan(0);
  })
});
