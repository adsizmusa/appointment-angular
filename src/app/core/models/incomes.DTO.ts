import { BaseDTO } from './base.DTO';

export class IncomesDTO extends BaseDTO {
  constructor(init?: Partial<IncomesDTO>) {
    super();
    Object.assign(this, init);
  }

  serviceID?: number = 0;
  productID?: number = 0;
  description: string;
  price?: number = 0;
}
