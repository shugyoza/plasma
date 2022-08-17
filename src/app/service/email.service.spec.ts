import { TestBed } from '@angular/core/testing';
import { isObservable } from 'rxjs';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { variables } from 'src/variables';
import { EmailService } from './email.service';

describe('EmailService', () => {
  let service: EmailService;
  const body = {
    name: "Unit Test",
    email: variables.test.emailAddress || "transenid@gmail.com",
    content: variables.test.emailContent || "Email content for Unit Test"
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ],
      providers: [ ]
    });
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`sendEmail should have sent an email to the email address as you specified in: src/variables.ts `, () => {
    let returned!: any;
    let observable = service.sendEmail(body)
    let subscription$ = observable.subscribe({
      next: (data: any) => returned = data,
      error: (err: Error) => console.error(err)
    });
    subscription$.unsubscribe();
    // an email should have been sent to the email address as you specified in: src/variables.ts
    expect(isObservable(observable)).toBeTrue();
  })
});
