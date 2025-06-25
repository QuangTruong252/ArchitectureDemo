import { Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list.component';
import { OrderHistoryComponent } from './components/order-history.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: 'orders',
    component: OrderHistoryComponent
  },
  {
    path: '**',
    redirectTo: '/products'
  }
];
