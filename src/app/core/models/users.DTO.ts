import { BaseDTO } from './base.DTO';

export class UsersDTO extends BaseDTO {
  constructor(init?: Partial<UsersDTO>) {
    super();
    Object.assign(this, init);
  }
  name: string;
  surname: string;
  mobilePhone: string;
  emailAddress: string;
  address: string;
  birthday?: Date;
  gender?: number;
  genders: any = [
    { name: 'Erkek', value: 1 },
    { name: 'Kadın', value: 2 },
  ];
  description: string;
  username: string;
  passwordNew: string;
  color: string;
  baseWorkerId?: number;
  permissonIds: string;
  commission: number;
}
