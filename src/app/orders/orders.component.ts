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
  customer: ICustomer | undefined;
  errMessage = '';
  private _getOrderSubscription: Subscription | undefined;
  private _getCustomerSubscription: Subscription | undefined;
  constructor(
    private _dataService: DataService,
    private _route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this._unsubscribeGetOrderSubscription();
    this._unsubscribeGetCustomerSubscription();
  }
  ngOnInit() {
    this._getOrder();
    this._getCustomer();
  }

  private _extractIdFromParam() {
    const id = this._route.snapshot.paramMap.get('id');
    return id ?? '';
  }

  private _getOrder() {
    const id = +this._extractIdFromParam();
    if (isNaN(id)) {
      return ;
    }

    this._getOrderSubscription = this._dataService.getOrders$(id).subscribe({
      next: (orders) => {
        this.orders = orders;
      },
      error:(err) => {
        console.error('server error:', err);
        this.errMessage = (err.error instanceof Error) ? err.error.message :'Node.js server error';
      }
    });
  }

  private _getCustomer(){
    const id = +this._extractIdFromParam();
    if(isNaN(id)){
      return ;
    }
    this._getCustomerSubscription = this._dataService.getCustomer$(id).subscribe({
      next: (customerDetails) =>{
        this.customer = customerDetails;
        console.log({customerDetails});
      },
      error:(err) => {
        console.error('server error:', err);
        this.errMessage = (err.error instanceof Error) ? err.error.message :'Node.js server error';
      }
    })
  }

  private _unsubscribeGetOrderSubscription(){
    if (this._getOrderSubscription instanceof Subscription) {
      this._getOrderSubscription.unsubscribe();
    }
  }

  private _unsubscribeGetCustomerSubscription(){
    if (this._getCustomerSubscription instanceof Subscription){
      this._getCustomerSubscription.unsubscribe();
    }
  }
}
