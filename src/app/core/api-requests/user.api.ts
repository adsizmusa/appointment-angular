import { environmentURL } from 'src/environments/environmentURL';
import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class UserAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum) + 'Users/';
  getUserRights = this.BASE_URL + 'GetUserRights';
  getUserMenus = this.BASE_URL + 'GetUserMenus';
  updateUserMenus = this.BASE_URL + 'UpdateUserMenus';
  constructor(private apiEnum: ApiEnum) {}
}
