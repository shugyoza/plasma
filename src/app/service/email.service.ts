import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sentEmail(body: any): Subscription {
    let headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post("http://localhost:3000/sendmail", body, headers ).subscribe({
      next: (data: any) => console.log(data),
      error: (err: Error) => console.error(err)
    });
  }
}
