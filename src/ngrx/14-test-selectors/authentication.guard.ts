// src/app/guards/authentication.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  constructor(private router: Router) {}

  canActivate(): Observable<UrlTree | boolean> {
    // TODO: Replace `of(true)` with selectToken selector
    return of(true).pipe(
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
