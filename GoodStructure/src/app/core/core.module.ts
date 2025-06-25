import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

/**
 * Core Module
 * - Contains singleton services and guards
 * - Should only be imported once by AppModule
 * - Throws error if imported multiple times
 */
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}