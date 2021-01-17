import { environmentURL } from 'src/environments/environmentURL';
import { Debugs } from 'src/environments/debugs';
import { ApiEnum } from 'src/environments/api.enum';

export class AppointmentAPI {
  debugs: Debugs = new Debugs();
  BASE_URL: string = this.debugs.onDebug(this.apiEnum) + 'appointments/';
  getScheduler = this.BASE_URL + 'GetScheduler';
  constructor(private apiEnum: ApiEnum) {}
}
