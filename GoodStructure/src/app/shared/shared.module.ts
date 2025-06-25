import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { SortByNamePipe } from './pipes/sort-by-name.pipe';
import { ProductCardComponent } from './components/ProductCard/product-card.component';

/**
 * Shared Module
 * - Contains reusable components, pipes, and directives
 * - Can be imported by feature modules
 * - Promotes code reusability across the application
 */
@NgModule({
  imports: [
    CommonModule,
    FormatCurrencyPipe,
    SortByNamePipe,
    ProductCardComponent
  ],
  exports: [
    FormatCurrencyPipe,
    SortByNamePipe,
    ProductCardComponent,
  ]
})
export class SharedModule { }