import { Component,OnInit } from '@angular/core';

import { ICustomer } from '../shared/interfaces';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    
})
export class CustomersListComponent implements OnInit {
    filteredCustomers: ICustomer[] = [];
    customersOrderTotal: number | null=null;
    currencyCode: string = 'Ksh';
    constructor() {}
        
    ngOnInit() {
        
    }
}
