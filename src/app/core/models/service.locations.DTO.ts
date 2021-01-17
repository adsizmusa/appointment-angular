import { BaseDTO } from './base.DTO';

export class ServiceLocationsDTO extends BaseDTO {
  constructor(init?: Partial<ServiceLocationsDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  description: string;
}
