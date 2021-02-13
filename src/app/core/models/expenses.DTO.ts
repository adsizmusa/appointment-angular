import { BaseDTO } from './base.DTO';

export class ExpensesDTO extends BaseDTO {
  constructor(init?: Partial<ExpensesDTO>) {
    super();
    Object.assign(this, init);
  }

  productId?: number;
  description: string;
  price?: number;
}
