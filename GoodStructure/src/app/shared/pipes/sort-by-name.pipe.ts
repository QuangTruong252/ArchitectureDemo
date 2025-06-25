import { Pipe, PipeTransform } from '@angular/core';

/**
 * Custom Pipe - Pipe Pattern Implementation
 * - Sorts arrays by name property
 * - Can be used for any object with a name property
 */
@Pipe({
  name: 'sortByName',
  pure: true
})
export class SortByNamePipe implements PipeTransform {
  transform<T extends { name: string }>(array: T[], direction: 'asc' | 'desc' = 'asc'): T[] {
    if (!array || array.length <= 1) return array;
    
    return [...array].sort((a, b) => {
      const comparison = a.name.localeCompare(b.name);
      return direction === 'asc' ? comparison : -comparison;
    });
  }
}