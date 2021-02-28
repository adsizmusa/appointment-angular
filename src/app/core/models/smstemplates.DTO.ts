import { BaseDTO } from './base.DTO';

export class SmstemplatesDTO extends BaseDTO {
  constructor(init?: Partial<SmstemplatesDTO>) {
    super();
    Object.assign(this, init);
  }

  smsOptionID?: number;
  text?: string;
  sendTime?: number;
  sendSms: boolean;
}
