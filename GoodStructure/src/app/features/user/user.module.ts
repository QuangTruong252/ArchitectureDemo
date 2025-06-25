import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserProfileComponent } from './components/user-profile.component';

/**
 * User Feature Module
 * - Handles user-related functionality
 * - Lazy loaded for better performance
 */
@NgModule({
  imports: [
    CommonModule,
    UserProfileComponent,
    RouterModule.forChild([
      { path: '', component: UserProfileComponent }
    ])
  ]
})
export class UserModule { }