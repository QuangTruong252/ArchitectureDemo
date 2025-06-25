import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of([]);
  }
}