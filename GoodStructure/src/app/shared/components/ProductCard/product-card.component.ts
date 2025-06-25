import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '../../../features/products/models/product.model';
import { FormatCurrencyPipe } from '../../pipes/format-currency.pipe';

/**
 * Dumb Component (Presentational Component)
 * - Only handles presentation logic
 * - Receives data via @Input
 * - Emits events via @Output
 * - No direct service dependencies
 */
@Component({
  selector: 'app-product-card',
  imports: [FormatCurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
