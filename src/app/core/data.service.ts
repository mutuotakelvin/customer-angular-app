import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { ICustomer, IOrder } from '../shared/interfaces';

@Injectable()
export class DataService {

    baseUrl: string = 'assets/';
    
    constructor(private http: HttpClient) { }

    getCustomers$(){
        return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
            
    }

    getCustomer$(id: number){
        return this.http.get<ICustomer[]>(this.baseUrl + 'customers.json')
            .pipe(
                map(customers => {
                    let customer = customers.find((cust: ICustomer) => cust.id === id);
                    return customer as ICustomer; 
                })
            )
    }

    getOrders$(id: number){
        return this.http.get<IOrder[]>(this.baseUrl + 'orders.json')
            .pipe(
                map(orders =>{
                    let custOrders = orders.filter((order: IOrder) => order.customerId === id)
                    return custOrders;
                })
            )
    }

}
