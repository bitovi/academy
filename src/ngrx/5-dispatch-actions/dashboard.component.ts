// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import * as LoginActions from '../store/login/login.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  // Select username from store
  // TODO: Replace `of('TODO')` with selectUsername selector
  readonly username$ = of('TODO');

  // Select user ID from store
  // TODO: Replace `of('TODO')` with selectUserId selector
  readonly userId$ = of('TODO');

  constructor(private store: Store) {}

  logout(): void {
    this.store.dispatch(LoginActions.logout());
  }
}
