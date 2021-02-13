import { BaseDTO } from './base.DTO';

export class CustomersDTO extends BaseDTO {
  constructor(init?: Partial<CustomersDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  surname: string;
  mobilePhone: string;
  emailAddress: string;
  address: string;
  birthday?: Date;
  gender?: number;
  price?: number;
  description: string;
  isSendSms?: boolean;
}
