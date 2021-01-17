import { UsersDTO } from './users.DTO';
import { CompaniesDTO } from './companies.DTO';

export class AuthResponse {
  isSuccess: boolean;
  token: string;
  expiresOn: Date;
  user: UsersDTO;
  company: CompaniesDTO;
  companys: CompaniesDTO[];
  message: string;
  showInfoBox: boolean;
}
