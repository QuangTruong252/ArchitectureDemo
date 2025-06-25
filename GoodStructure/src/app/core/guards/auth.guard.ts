import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

/**
 * Auth Guard - Guard Pattern Implementation
 * - Protects routes from unauthorized access
 * - Redirects to login if user is not authenticated
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          console.log('User is authenticated, access granted.');
          return true;
        } else {
          console.warn('User is not authenticated, access denied. Redirecting to login.');
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}