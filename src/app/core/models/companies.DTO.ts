import { BaseDTO } from './base.DTO';

export class CompaniesDTO extends BaseDTO {
  constructor(init?: Partial<CompaniesDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  phone: string;
  emailAddress: string;
  address: string;
  authorizedPerson: string;
  authorizedPhone: string;
  authorizedEmailAddress: string;
  description: string;
  activationExpiryDate?: Date;
}
