import { BaseDTO } from './base.DTO';

export class ProductsDTO extends BaseDTO {
  constructor(init?: Partial<ProductsDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  price?: number;
  brand: string;
  supplierName: string;
  supplierPhone: string;
  amountOfStock: number;
  description: string;
}
