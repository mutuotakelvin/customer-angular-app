import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataService } from '../core/data.service';
import { ICustomer } from '../shared/interfaces';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  //   styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit, OnDestroy {
  title: string | null = null;
  people: ICustomer[] = [];
  errMessage = '';
  private _getCustomersSubscription: Subscription | undefined;

  constructor(private _dataService : DataService) {}

  ngOnDestroy(){
      if(this._getCustomersSubscription instanceof Subscription){
        this._getCustomersSubscription.unsubscribe();
      }
  }

  ngOnInit() {
    this.title = 'Customers';
    this._getCustomersSubscription = this._dataService.getCustomers$().subscribe({
      next: (customers) => {
        this.people = customers;
      },
      error: (err) => {
        console.error('server error:', err);
        if (err.error instanceof Error) {
          this.errMessage = err.error.message;
        } else {
          this.errMessage = 'Node.js server error';
        }
      },
    });
    //   this.people = [
    //     { id: 1, name: 'john Doe', city: 'Phoenix', orderTotal: 9.99, customerSince: new Date(2014, 7, 10) },
    //     { id: 2, name: 'Jane Doe', city: 'Chandler', orderTotal: 19.99, customerSince: new Date(2017, 2, 22)},
    //     { id: 3, name: 'Michelle Thomas', city: 'Seattle', orderTotal: 99.99, customerSince: new Date(2002, 10, 31)},
    //     { id: 4, name: 'Jim Thomas', city: 'New York', orderTotal: 599.99, customerSince: new Date(2002, 10, 31)},
    // ];
  }
}
