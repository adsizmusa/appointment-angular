import { BaseDTO } from './base.DTO';

export class AppointmentsDTO extends BaseDTO {
  constructor(init?: Partial<AppointmentsDTO>) {
    super();
    Object.assign(this, init);
  }
  name?: string;
  userId?: number;
  userName?: string;
  customerId?: number;
  customerName?: string;
  serviceId?: number;
  serviceName?: string;
  serviceLocationId?: number;
  startDate?: Date = null;
  endDate?: Date = null;
  description: string;
  additionalNote: string;
  price?: number;
  enable: boolean = true;
}
