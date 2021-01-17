import { environmentURL } from 'src/environments/environmentURL';
import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class DefaultAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum);
  constructor(private apiEnum: ApiEnum) {}

  getlanguages = this.BASE_URL + 'common/getlanguages';
}
