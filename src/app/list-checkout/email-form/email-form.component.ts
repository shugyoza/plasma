import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent {

  @Output() emailInput = new EventEmitter();

  emailForm = new FormControl('', [Validators.minLength(4), Validators.email]);

  onCheckout(): void {
    console.log(this.emailForm.errors)
    if (this.emailForm.errors) return;
    this.emailInput.emit(this.emailForm.value)
  }

}
