import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './components/product-list.component';
import { ProductFacade } from './facades/product.facade';
import { SharedModule } from '../../shared/shared.module';

/**
 * Products Feature Module
 * - Encapsulates all product-related functionality
 * - Can be lazy loaded to improve initial bundle size
 * - Provides ProductFacade for complex operations
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: ProductListComponent }
    ]),
    SharedModule
  ],
  declarations: [
    ProductListComponent
  ],
  providers: [
    ProductFacade
  ]
})
export class ProductsModule { }