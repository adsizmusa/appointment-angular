import { environmentURL } from 'src/environments/environmentURL';
import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class CompanyAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum) + 'Companies/';
  getCompanyMenus = this.BASE_URL + 'GetCompanyMenus';
  updateCompanyMenus = this.BASE_URL + 'UpdateCompanyMenus';

  constructor(private apiEnum: ApiEnum) {}
}
