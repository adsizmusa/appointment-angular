import { BaseDTO } from './base.DTO';

export class AppointmentsDTO extends BaseDTO {
  constructor(init?: Partial<AppointmentsDTO>) {
    super();
    Object.assign(this, init);
  }
  name?: string;
  userId?: number;
  customerId?: number;
  serviceId?: number;
  serviceLocationId?: number;
  startDate?: Date = null;
  endDate?: Date = null;
  description: string;
  additionalNote: string;
  price?: number;
}
