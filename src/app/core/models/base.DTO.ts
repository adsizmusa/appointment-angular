export class BaseDTO {
  id?: number = 0;
  companyId: number;
  createdDate: Date = new Date();
  createdUser: number;
  updatedDate?: Date = new Date();
  updatedUser?: number;
}
