import { environmentURL } from './environmentURL';
import { ApiEnum } from './api.enum';

export class Debugs {
  onDebug(apiEnum: ApiEnum): string {
    switch (apiEnum) {
      case ApiEnum.DevApp: {
        return environmentURL.BASE_URL_dev;
        break;
      }
      case ApiEnum.Localhost: {
        return environmentURL.BASE_URL_local;
        break;
      }
      case ApiEnum.Production: {
        return environmentURL.BASE_URL_prod;
        break;
      }
    }
  }
}
