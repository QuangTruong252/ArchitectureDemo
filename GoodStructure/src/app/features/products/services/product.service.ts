import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product.model';

/**
 * Product Service - Singleton Pattern Implementation
 * - Handles all product-related API calls
 * - Provided at root level for singleton behavior
 */
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private mockProducts: Product[] = [
    {
      id: '1',
      name: 'Laptop Pro',
      description: 'High-performance laptop for professionals',
      price: 1299.99,
      category: 'electronics',
      inStock: true,
      createdAt: new Date()
    },
    {
      id: '2',
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling headphones',
      price: 299.99,
      category: 'electronics',
      inStock: true,
      createdAt: new Date()
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.mockProducts).pipe(delay(500));
  }

  getProduct(id: string): Observable<Product | undefined> {
    const product = this.mockProducts.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }

  createProduct(product: Product): Observable<Product> {
    const newProduct = { ...product, id: Date.now().toString() };
    this.mockProducts.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts[index] = { ...this.mockProducts[index], ...product };
      return of(this.mockProducts[index]).pipe(delay(500));
    }
    throw new Error('Product not found');
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.mockProducts.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  searchProducts(query: string): Observable<Product[]> {
    const filtered = this.mockProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}