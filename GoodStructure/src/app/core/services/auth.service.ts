import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * Authentication Service - Singleton Pattern
 * - Manages user authentication state
 * - Provided at root level ensuring single instance
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  private _currentUser$ = new BehaviorSubject<any>(null);

  // Public observables
  isAuthenticated$ = this._isAuthenticated$.asObservable();
  currentUser$ = this._currentUser$.asObservable();

  constructor() {
    // Check if user is already logged in (e.g., from localStorage)
    this.checkAuthStatus();
  }

  login(email: string, password: string): Observable<boolean> {
    // Mock login implementation
    return new Observable(observer => {
      setTimeout(() => {
        if (email && password) {
          const mockUser = {
            id: '1',
            email,
            firstName: 'John',
            lastName: 'Doe',
            role: 'user'
          };
          
          this._currentUser$.next(mockUser);
          this._isAuthenticated$.next(true);
          localStorage.setItem('auth_token', 'mock_token');
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      }, 1000);
    });
  }

  logout(): void {
    this._currentUser$.next(null);
    this._isAuthenticated$.next(false);
    localStorage.removeItem('auth_token');
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // In real app, validate token with backend
      this._isAuthenticated$.next(true);
    }
  }

  isLoggedIn(): boolean {
    return this._isAuthenticated$.value;
  }
}