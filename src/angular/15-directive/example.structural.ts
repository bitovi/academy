import { Component } from '@angular/core';

@Component({
  selector: 'app-message',
  template: `
    <p *ngIf="showMessage">
      Conditional message!
    </p>
  `
})
export class AppMessageComponent {
  showMessage: boolean = true;

  // You can toggle this value to show or hide the message
  toggleMessage(): void {
    this.showMessage = !this.showMessage;
  }
}