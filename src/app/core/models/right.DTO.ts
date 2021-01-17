import { CompaniesDTO } from './companies.DTO';
import { SpUserMenus } from './sp.user.menus';

export class RightsDTO {
  companiesDTOs: CompaniesDTO[] = [];
  spMenus: SpUserMenus[] = [];
  admin: boolean = false;
  constructor(init?: Partial<RightsDTO>) {
    Object.assign(this, init);
  }
}
