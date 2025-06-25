import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

/**
 * Facade Pattern Implementation
 * - Provides a simplified interface to complex product operations
 * - Hides implementation details from components
 * - Centralizes business logic related to products
 */
@Injectable({
  providedIn: 'root'
})
export class ProductFacade {
  private _loading$ = new BehaviorSubject<boolean>(false);
  private _products$ = new BehaviorSubject<Product[]>([]);
  private _selectedCategory$ = new BehaviorSubject<string>('all');

  constructor(private productService: ProductService) {}

  // Public observables
  loading$ = this._loading$.asObservable();
  products$ = this._products$.asObservable();
  
  // Filtered products based on selected category
  filteredProducts$ = combineLatest([
    this.products$,
    this._selectedCategory$
  ]).pipe(
    map(([products, category]) => 
      category === 'all' 
        ? products 
        : products.filter(p => p.category === category)
    )
  );

  // Public methods
  loadProducts(): void {
    this._loading$.next(true);
    this.productService.getProducts().subscribe({      next: (products: Product[]) => {
        this._products$.next(products);
        this._loading$.next(false);
      },
      error: (error: any) => {
        console.error('Error loading products:', error);
        this._loading$.next(false);
      }
    });
  }

  selectCategory(category: string): void {
    this._selectedCategory$.next(category);
  }

  addProduct(product: Product): Observable<Product> {
    this._loading$.next(true);
    return this.productService.createProduct(product).pipe(
      map(newProduct => {
        const currentProducts = this._products$.value;
        this._products$.next([...currentProducts, newProduct]);
        this._loading$.next(false);
        return newProduct;
      })
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    return this.productService.searchProducts(query);
  }
}
