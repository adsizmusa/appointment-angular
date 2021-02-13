import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { IncomesDTO } from '../models/incomes.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeService extends BaseService {
  incomesDTOs: IncomesDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getIncomes()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.incomesDTOs = data.map((s) => {
          return new IncomesDTO(s);
        });
      });
  }
}
