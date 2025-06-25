import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom Pipe - Pipe Pattern Implementation
 * - Transforms currency values for display
 * - Pure pipe for better performance
 */
@Pipe({
  name: 'formatCurrency',
  pure: true
})
export class FormatCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = 'USD'): string {
    if (value == null) return '';
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
    }).format(value);
  }
}