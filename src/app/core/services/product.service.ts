import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ProductsDTO } from '../models/products.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends BaseService {
  productsDTOs: ProductsDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getProducts()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.productsDTOs = data.map((s) => {
          return new ProductsDTO(s);
        });
      });
  }
}
