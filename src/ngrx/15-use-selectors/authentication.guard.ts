// src/app/guards/authentication.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as LoginSelectors from '../store/login/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private store: Store) {}

  canActivate(): Observable<UrlTree | boolean> {
    return this.store.select(LoginSelectors.selectToken).pipe(
      map(token => {
        // Allow navigation since there is a login token
        if (token) {
          return true;
        }

        // Redirect back to login page
        return this.router.createUrlTree(['']);
      })
    );
  }

  canLoad(): Observable<UrlTree | boolean> {
    return this.canActivate();
  }
}
