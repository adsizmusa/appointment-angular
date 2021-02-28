import { BaseDTO } from './base.DTO';

export class ExpensesDTO extends BaseDTO {
  constructor(init?: Partial<ExpensesDTO>) {
    super();
    Object.assign(this, init);
  }

  productID?: number;
  productAmount?: number;
  description: string;
  price?: number;
}
