import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ContactActions from '../store/contact/contact.actions';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  constructor(private store: Store) {}

  submit(emailAddress: string, fullName: string): void {
    this.store.dispatch(ContactActions.submit({ emailAddress, fullName }));
  }
}