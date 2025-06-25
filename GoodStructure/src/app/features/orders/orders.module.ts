import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderHistoryComponent } from './components/order-history.component';

/**
 * Orders Feature Module
 * - Handles order-related functionality
 * - Lazy loaded for better performance
 */
@NgModule({
  imports: [
    CommonModule,
    OrderHistoryComponent,
    RouterModule.forChild([
      { path: '', component: OrderHistoryComponent }
    ])
  ]
})
export class OrdersModule { }