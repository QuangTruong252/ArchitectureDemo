import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

/**
 * Application Routes with Lazy Loading Implementation
 * - Feature modules are loaded only when needed
 * - Reduces initial bundle size
 * - Improves application startup performance
 */
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard] // Protected route
  },
  {
    path: 'user',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard] // Protected route
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
