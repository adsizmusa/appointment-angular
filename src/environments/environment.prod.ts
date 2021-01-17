import { DefaultAPI } from '../app/core/api-requests/default.api';
import { ApiEnum } from 'src/environments/api.enum';
import { AppointmentAPI } from 'src/app/core/api-requests/appointment.api';
import { AutAPI } from 'src/app/core/api-requests/auth.api';
import { CompanyAPI } from 'src/app/core/api-requests/company.api';
import { CustomerAPI } from 'src/app/core/api-requests/customer.api';
import { UserAPI } from 'src/app/core/api-requests/user.api';
import { ServicesLocationAPI } from 'src/app/core/api-requests/services.location.api';
import { ServiceAPI } from 'src/app/core/api-requests/service.api';
import { OrderformAPI } from 'src/app/core/api-requests/orderform.api';

export class environment {
  production: boolean = true;

  api = ApiEnum.DevApp;
  default: DefaultAPI = new DefaultAPI(this.api);
  appointmentAPI: AppointmentAPI = new AppointmentAPI(this.api);

  companyAPI: CompanyAPI = new CompanyAPI(this.api);
  customerAPI: CustomerAPI = new CustomerAPI(this.api);
  userAPI: UserAPI = new UserAPI(this.api);
  serviceAPI: ServiceAPI = new ServiceAPI(this.api);
  autAPI: AutAPI = new AutAPI(this.api);
  servicesLocationAPI: ServicesLocationAPI = new ServicesLocationAPI(this.api);
  orderformAPI: OrderformAPI = new OrderformAPI(this.api);
}
