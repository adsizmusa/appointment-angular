import { Injectable } from '@angular/core';
import { CompaniesDTO } from '../models/companies.DTO';
import { UsersDTO } from '../models/users.DTO';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  readonly TOKEN_KEY: string = 'op_token';

  readonly COMPANY_KEY: string = 'op_company';
  readonly COMPANYS_KEY: string = 'op_companys';
  readonly USER_KEY: string = 'op_user';
  public get token(): string {
    return window.localStorage.getItem(this.TOKEN_KEY);
  }

  public set token(value: string) {
    if (value) {
      window.localStorage.setItem(this.TOKEN_KEY, value);
    }
  }
  public removeToken() {
    window.localStorage.removeItem(this.TOKEN_KEY);
  }
  public get company(): CompaniesDTO {
    if (window.localStorage.getItem(this.COMPANY_KEY)) {
      try {
        return JSON.parse(
          window.localStorage.getItem(this.COMPANY_KEY)
        ) as CompaniesDTO;
      } catch (e) {
        return new CompaniesDTO();
      }
    }

    return new CompaniesDTO();
  }

  public set company(value: CompaniesDTO) {
    if (value) {
      window.localStorage.setItem(this.COMPANY_KEY, JSON.stringify(value));
    }
  }
  public removeCompany() {
    window.localStorage.removeItem(this.COMPANY_KEY);
  }

  public get user(): UsersDTO {
    if (window.localStorage.getItem(this.USER_KEY)) {
      try {
        return JSON.parse(
          window.localStorage.getItem(this.USER_KEY)
        ) as UsersDTO;
      } catch (e) {
        return null;
      }
    }

    return null;
  }

  public set user(value: UsersDTO) {
    if (value) {
      window.localStorage.setItem(this.USER_KEY, JSON.stringify(value));
    }
  }

  public removeUser() {
    window.localStorage.removeItem(this.USER_KEY);
  }
  constructor() {}
}
