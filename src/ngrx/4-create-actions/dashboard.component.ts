// src/app/dashboard/dashboard.component.ts

import { Component } from '@angular/core';
import { of } from 'rxjs';

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

  logout(): void {
    // TODO: Dispatch LoginActions.logout action
  }
}
