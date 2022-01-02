import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { DataService } from '../core/data.service';
import { ICustomer, IOrder, IOrderItem } from '../shared/interfaces';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: IOrder[] = [];
  customer: string | null = null;
  errMessage = '';
  private _getOrderSubscription : Subscription | undefined;

  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute
  ) {}

  ngOnDestroy(){
      if(this._getOrderSubscription instanceof Subscription){
          this._getOrderSubscription.unsubscribe();
      }
  }
  ngOnInit() {
    let id = +this._route.snapshot.paramMap.get('id');
    this._getOrderSubscription = this._dataService.getOrders$(id).subscribe({
        next:(order: IOrder[]) => {
            this.orders = orders;
        },
        error: (err) => {
            console.error('server error:', err);
            if (err.error instanceof Error) {
              this.errMessage = err.error.message;
            } else {
              this.errMessage = 'Node.js server error';
            }
        }
    })
  }
}
