// Note: This example code is not part of our application repo or solution
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ContactSelectors from '../store/contact/contact.selectors';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  readonly emailAddress$ = this.store.select(ContactSelectors.emailAddress);

  constructor(private store: Store) {}
}
