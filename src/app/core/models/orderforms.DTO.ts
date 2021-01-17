import { BaseDTO } from './base.DTO';

export class OrderFormsDTO extends BaseDTO {
  constructor(init?: Partial<OrderFormsDTO>) {
    super();
    Object.assign(this, init);
  }
  invoiceNumber: string;
  invoiceDate?: Date = new Date();
  customerName: string;
  customerPrice?: number;
  productName: string;
  productAmount?: number;
  supplierName: string;
  supplierPrice?: number;
  marketplace: string;
  outletStorage: string;
  description: string;
}
