import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CustomersDTO } from '../models/customers.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService extends BaseService {
  customersDTOs: CustomersDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getCustomers()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.customersDTOs = data.map((s) => {
          return new CustomersDTO(s);
        });

        // me.appointmentsDTOs = data;
      });
  }
}
