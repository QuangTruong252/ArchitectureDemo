# 🚀 Good Structure Angular Project

This project demonstrates the implementation of a **feature-based architecture** for Angular applications, showcasing best practices for scalable and maintainable code organization.

---

## 📁 Project Structure

This project implements a clean, feature-driven architecture that promotes high cohesion and low coupling:

```
src/
└── app/
    ├── core/                # 🔧 Core Module
    │   ├── services/
    │   │   └── auth.service.ts
    │   ├── guards/
    │   │   └── auth.guard.ts
    │   └── core.module.ts
    │
    ├── shared/              # 🔗 Shared Module
    │   ├── components/
    │   │   ├── product-card.component.ts    # Dumb Component
    │   │   └── product-card.component.scss
    │   ├── pipes/
    │   │   ├── format-currency.pipe.ts
    │   │   └── sort-by-name.pipe.ts
    │   └── shared.module.ts
    │
    ├── features/            # ✨ Feature Modules
    │   ├── products/
    │   │   ├── components/
    │   │   │   ├── product-list.component.ts    # Smart Component
    │   │   │   └── product-list.component.scss
    │   │   ├── services/
    │   │   │   └── product.service.ts
    │   │   ├── facades/
    │   │   │   └── product.facade.ts            # Facade Pattern
    │   │   ├── models/
    │   │   │   └── product.model.ts
    │   │   └── products.module.ts               # Lazy Loaded
    │   │
    │   ├── orders/
    │   │   ├── components/
    │   │   │   └── order-history.component.ts
    │   │   ├── services/
    │   │   │   └── order.service.ts
    │   │   ├── models/
    │   │   │   └── order.model.ts
    │   │   └── orders.module.ts                 # Lazy Loaded
    │   │
    │   └── user/
    │       ├── components/
    │       │   └── user-profile.component.ts
    │       ├── services/
    │       │   └── user.service.ts
    │       ├── models/
    │       │   └── user.model.ts
    │       └── user.module.ts                   # Lazy Loaded
    │
    ├── app.config.ts
    ├── app.routes.ts        # Lazy Loading Configuration
    └── app.ts
```

---

## 🏛️ Architecture Principles

This project implements several key architectural principles and design patterns:

### Core Architecture

- **Feature-Sliced Design (FSD):** Each feature is organized as a self-contained slice with its own components, services, and models
- **Domain-Driven Design (DDD):** Code organization reflects business domains (products, orders, users)
- **Modular Architecture:** Clear separation between core, shared, and feature modules

### Module Organization

#### 🔧 Core Module
- **Purpose:** Contains singleton services and application-wide functionality
- **Contains:** Authentication services, guards, interceptors, and other app-wide utilities
- **Rule:** Should only be imported once by the AppModule

#### 🔗 Shared Module  
- **Purpose:** Houses reusable components, pipes, and directives
- **Contains:** UI components, utility pipes, common models
- **Rule:** Can be imported by any feature module

#### ✨ Feature Modules
- **Purpose:** Encapsulate specific business features
- **Contains:** Feature-specific components, services, models, and routing
- **Rule:** Should be independent and communicate via well-defined APIs

---

## 🎯 Design Patterns Implemented

### 1. **Smart/Dumb Components (Container/Presentational):**
- **Smart Components:** Handle data fetching and business logic (e.g., `ProductList`)
  ```typescript
  // Smart Component - manages state and business logic
  export class ProductList implements OnInit {
    loading$ = this.productFacade.loading$;
    filteredProducts$ = this.productFacade.filteredProducts$;
    
    constructor(private productFacade: ProductFacade) {}
    
    ngOnInit(): void {
      this.productFacade.loadProducts(); // Business logic
    }
  }
  ```
- **Dumb Components:** Focus on presentation and user interaction (e.g., `ProductCard`)
  ```typescript
  // Dumb Component - only handles presentation
  export class ProductCard {
    @Input() product!: Product;
    @Output() addToCart = new EventEmitter<Product>();
    
    onAddToCart(): void {
      this.addToCart.emit(this.product); // Just emits events
    }
  }
  ```

### 2. **Facade Pattern:**
- **Description:** Provides a simplified interface to complex subsystems, such as API calls or state management.
- **Implementation:** `ProductFacade` simplifies product operations by coordinating between service calls and state management
  ```typescript
  export class ProductFacade {
    loading$ = this._loading$.asObservable();
    filteredProducts$ = combineLatest([this.products$, this._selectedCategory$]);
    
    loadProducts(): void {
      // Coordinates complex operations behind simple interface
    }
  }
  ```
- **Key Benefit:** Reduces complexity and improves code readability by hiding intricate details behind a clean interface.

### 3. **Singleton Pattern:**
- **Description:** Core services (like `AuthService`) are provided at the root level, ensuring a single instance throughout the application.
- **Implementation:** Services use `providedIn: 'root'` to ensure singleton behavior
  ```typescript
  @Injectable({
    providedIn: 'root' // Ensures singleton instance
  })
  export class AuthService {
    private _isAuthenticated$ = new BehaviorSubject<boolean>(false);
  }
  ```
- **Key Benefit:** Reduces memory usage and ensures consistent state across the application.

### 4. **Observer Pattern:**
- **Description:** Implemented through RxJS for reactive programming and state management.
- **Implementation:** Services expose observables that components can subscribe to
  ```typescript
  // Service exposes observables
  isAuthenticated$ = this._isAuthenticated$.asObservable();
  
  // Components observe changes
  constructor(private authService: AuthService) {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      // React to authentication changes
    });
  }
  ```
- **Key Benefit:** Creates reactive, event-driven architecture with loose coupling.

### 5. **Guard Pattern:**
- **Description:** Angular guards (like `AuthGuard`) protect routes and ensure that only authorized users can access certain features.
- **Implementation:** Guards implement `CanActivate` interface to control route access
  ```typescript
  @Injectable({ providedIn: 'root' })
  export class AuthGuard implements CanActivate {
    canActivate(): Observable<boolean> {
      return this.authService.isAuthenticated$.pipe(
        map(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['/login']);
            return false;
          }
          return true;
        })
      );
    }
  }
  ```
- **Key Benefit:** Enhances security and user experience by preventing unauthorized access.

### 6. **Pipe Pattern:**
- **Description:** Custom pipes transform data in templates, promoting reusability and clean presentation logic.
- **Implementation:** Pure pipes for data transformation
  ```typescript
  @Pipe({ name: 'formatCurrency', pure: true })
  export class FormatCurrencyPipe implements PipeTransform {
    transform(value: number, currency: string = 'USD'): string {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
      }).format(value);
    }
  }
  ```
- **Key Benefit:** Separates presentation logic from component logic, improving reusability.

### 7. **Lazy Loading Pattern:**
- **Description:** Defers the loading of feature modules until they are needed (typically upon navigating to a route).
- **Implementation:** Use `loadChildren` in the Angular Router configuration
  ```typescript
  export const routes: Routes = [
    {
      path: 'products',
      loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule)
    },
    {
      path: 'orders',
      loadChildren: () => import('./features/orders/orders.module').then(m => m.OrdersModule),
      canActivate: [AuthGuard]
    }
  ];
  ```
- **Key Benefit:** Dramatically reduces the initial bundle size, improving first-page load times and optimizing the user experience.

### 8. **Module Pattern:**
- **Description:** Features are organized into self-contained modules with clear boundaries.
- **Implementation:** Each feature has its own module that encapsulates components, services, and routing
  ```typescript
  @NgModule({
    declarations: [ProductListComponent],
    imports: [CommonModule, RouterModule.forChild(routes)],
    providers: [ProductFacade]
  })
  export class ProductsModule { }
  ```
- **Key Benefit:** Promotes separation of concerns and enables code splitting.

### 9. **Dependency Injection Pattern:**
- **Description:** Angular's built-in DI system allows for easy injection of services into components and other services.
- **Implementation:** Services and dependencies are injected through constructor
  ```typescript
  constructor(
    private productService: ProductService,
    private authService: AuthService
  ) {}
  ```
- **Key Benefit:** Promotes loose coupling and enhances testability by allowing services to be easily mocked or replaced.


---

## 🚀 Benefits of This Structure

### ✅ High Cohesion
- Related files are co-located within feature directories
- Easy to find and modify feature-specific code

### ✅ Low Coupling  
- Features are isolated with clear boundaries
- Changes to one feature don't affect others

### ✅ Scalability
- Easy to add new features without cluttering existing structure
- Support for lazy loading reduces initial bundle size

### ✅ Maintainability
- Intuitive organization for new developers
- Clear separation of concerns

### ✅ Testability
- Isolated modules are easier to unit test
- Dependency injection facilitates mocking

---

## 🛠️ Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   ng serve
   ```

3. **Build for production:**
   ```bash
   ng build --prod
   ```

---

## 📚 Further Reading

- [Angular Style Guide](https://angular.io/guide/styleguide)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Domain-Driven Design](https://martinfowler.com/bliki/DomainDrivenDesign.html)

---

> 💡 **Note:** This project serves as a practical example of good Angular architecture. Compare it with the `BadStructure` project to understand the differences and benefits of proper code organization.
