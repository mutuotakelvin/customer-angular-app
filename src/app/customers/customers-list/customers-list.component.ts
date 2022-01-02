import { Component,OnInit, Input } from '@angular/core';
import { SorterService } from 'src/app/core/sorter.service';
import { ICustomer } from '../../shared/interfaces';

@Component({
    selector: 'app-customers-list',
    templateUrl: './customers-list.component.html',
    
})
export class CustomersListComponent implements OnInit {
    private _customers: ICustomer[] = [];

    @Input() get customers(): ICustomer[]{
        return this._customers;
    }

    set customers(value: ICustomer[]){
        if (value){
            this.filteredCustomers = this._customers = value;
            this.calculateOrders();
        }
    }

    filteredCustomers: any[] = [];
    customersOrderTotal: number | null=null;
    currencyCode: string = 'Ksh';
    constructor(private sorterService: SorterService) {}
        
    ngOnInit() {

    }



    calculateOrders(){
        this.customersOrderTotal = 0;
        this.filteredCustomers.forEach((cust: ICustomer) => {
            this.customersOrderTotal += cust.orderTotal;
        })
    }

    filter(data: string){
        if(data){
            this.filteredCustomers = this.customers.filter((cust: ICustomer)=>{
                return cust.name.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                    cust.city.toLowerCase().indexOf(data.toLowerCase()) > -1 ||
                    cust.orderTotal.toString().indexOf(data) > -1;
            });
            
        } else{
            this.filteredCustomers = this.customers;
        }
        this.calculateOrders();
    }

    sort(prop: string){
        this.sorterService.sort(this.filteredCustomers, prop);
    }
}
