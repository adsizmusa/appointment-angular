import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { OrderFormsDTO } from '../models/orderforms.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class OrderFormService extends BaseService {
  orderformsDTOs: OrderFormsDTO[] = [];
  marketplaces: any = [
    { text: 'N11.com', value: 1 },
    { text: 'Gitti Gidyor', value: 2 },
    { text: 'Hepsi Burada', value: 3 },
    { text: 'Diğer', value: 4 },
  ];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getOrderForms()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.orderformsDTOs = data.map((s) => {
          return new OrderFormsDTO(s);
        });

        // me.appointmentsDTOs = data;
      });
  }
}
