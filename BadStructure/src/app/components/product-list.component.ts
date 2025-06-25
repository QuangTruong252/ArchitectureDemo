import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, delay } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="product-list-container">
      <h2>any List</h2>
      <div class="product-grid">
        <div class="product-card" *ngFor="let product of products">
          <h3>{{ product.name }}</h3>
          <p class="price">{{ product.price | currency:'USD' }}</p>
          <p class="description">{{ product.description }}</p>
          <button class="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-list-container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }

    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .product-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 20px;
      background: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      transition: transform 0.2s;
    }

    .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.15);
    }

    h3 {
      margin-top: 0;
      color: #2c3e50;
    }

    .price {
      font-size: 1.2em;
      font-weight: bold;
      color: #e74c3c;
      margin: 10px 0;
    }

    .description {
      color: #666;
      margin-bottom: 15px;
    }

    .btn-primary {
      background: #3498db;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.2s;
    }

    .btn-primary:hover {
      background: #2980b9;
    }
  `]
})
export class ProductListComponent {
  products = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 999,
      description: 'High-end smartphone with A17 Pro chip'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 899,
      description: 'Flagship Android smartphone with advanced AI'
    },
    {
      id: 3,
      name: 'MacBook Air M3',
      price: 1299,
      description: 'Ultra-thin laptop with powerful M3 chip'
    },
    {
      id: 4,
      name: 'iPad Pro 12.9',
      price: 1099,
      description: 'Professional tablet for creativity'
    }
  ];

  getProducts(): Observable<any[]> {
    return of(this.products).pipe(delay(500));
  }

  getProduct(id: string): Observable<any | undefined> {
    const product = this.products.find((p: any) => p.id === id);
    return of(product).pipe(delay(300));
  }

  createProduct(product: any): Observable<any> {
    const newProduct = { ...product, id: Date.now().toString() };
    this.products.push(newProduct);
    return of(newProduct).pipe(delay(500));
  }

  updateProduct(id: string, product: Partial<any>): Observable<any> {
    const index = this.products.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...product };
      return of(this.products[index]).pipe(delay(500));
    }
    throw new Error('any not found');
  }

  deleteProduct(id: string): Observable<boolean> {
    const index = this.products.findIndex((p: any) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of(true).pipe(delay(500));
    }
    return of(false).pipe(delay(500));
  }

  searchProducts(query: string): Observable<any[]> {
    const filtered = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filtered).pipe(delay(300));
  }
}