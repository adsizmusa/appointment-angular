import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { CompaniesDTO } from '../models/companies.DTO';
import { RightsDTO } from '../models/right.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService extends BaseService {
  companiesDTOs: CompaniesDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getCompanies()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.companiesDTOs = data.map((s) => {
          return new CompaniesDTO(s);
        });

        // me.appointmentsDTOs = data;
      });
  }
}
