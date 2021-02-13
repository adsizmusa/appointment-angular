import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ExpensesDTO } from '../models/expenses.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService extends BaseService {
  expensesDTOs: ExpensesDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getExpenses()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.expensesDTOs = data.map((s) => {
          return new ExpensesDTO(s);
        });
      });
  }
}
