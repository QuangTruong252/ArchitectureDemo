import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFacade } from '../facades/product.facade';
import { Product } from '../models/product.model';

/**
 * Smart Component (Container Component)
 * - Handles business logic and data fetching
 * - Manages state and coordinates with services
 * - Delegates presentation to dumb components
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: false, // Not a standalone component, part of ProductsModule
})
export class ProductListComponent implements OnInit {
  loading$: Observable<boolean>;
  filteredProducts$: Observable<Product[]>;

  constructor(private productFacade: ProductFacade) {
    this.loading$ = this.productFacade.loading$;
    this.filteredProducts$ = this.productFacade.filteredProducts$;
  }

  ngOnInit(): void {
    this.productFacade.loadProducts();
  }

  onCategoryChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.productFacade.selectCategory(target.value);
  }

  onAddToCart(product: Product): void {
    // Handle add to cart logic
    console.log('Adding to cart:', product);
    // In real app, this would call a cart service
  }
}