import { BaseDTO } from './base.DTO';

export class IncomesDTO extends BaseDTO {
  constructor(init?: Partial<IncomesDTO>) {
    super();
    Object.assign(this, init);
  }

  serviceID?: number;
  productID?: number;
  productAmount?: number;
  description: string;
  price?: number = 0;
}
