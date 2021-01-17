import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class AutAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum) + 'aut/';
  constructor(private apiEnum: ApiEnum) {}

  getToken = this.BASE_URL + 'GetToken';
}
