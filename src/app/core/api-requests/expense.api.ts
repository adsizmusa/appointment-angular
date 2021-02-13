import { environmentURL } from 'src/environments/environmentURL';
import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class ExpenseAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum) + 'Expenses/';
  constructor(private apiEnum: ApiEnum) {}
}
