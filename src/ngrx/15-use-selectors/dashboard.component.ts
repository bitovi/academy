// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as LoginActions from '../store/login/login.actions';
import * as LoginSelectors from '../store/login/login.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Select username from store
  readonly username$ = this.store.select(LoginSelectors.selectUsername);

  // Select user ID from store
  readonly userId$ = this.store.select(LoginSelectors.selectUserId);

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(LoginActions.logout());
  }
}
