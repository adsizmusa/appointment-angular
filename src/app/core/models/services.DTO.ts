import { BaseDTO } from './base.DTO';

export class ServicesDTO extends BaseDTO {
  constructor(init?: Partial<ServicesDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  price?: number;
  description: string;
  isGeneral?: boolean;
}
