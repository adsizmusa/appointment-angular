import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SmstemplatesDTO } from '../models/smstemplates.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class SmstemplateService extends BaseService {
  smstemplatesDTOs: SmstemplatesDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getProducts()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.smstemplatesDTOs = data.map((s) => {
          return new SmstemplatesDTO(s);
        });
      });
  }
}
