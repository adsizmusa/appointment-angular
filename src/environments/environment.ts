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
import { ProductAPI } from 'src/app/core/api-requests/product.api';
import { IncomeAPI } from 'src/app/core/api-requests/income.api';
import { ExpenseAPI } from 'src/app/core/api-requests/expense.api';
import { SmstemplateAPI } from 'src/app/core/api-requests/smstemplate.api';

export class environment {
  production: boolean = false;

  api = ApiEnum.Localhost;
  default: DefaultAPI = new DefaultAPI(this.api);
  appointmentAPI: AppointmentAPI = new AppointmentAPI(this.api);

  companyAPI: CompanyAPI = new CompanyAPI(this.api);
  customerAPI: CustomerAPI = new CustomerAPI(this.api);
  userAPI: UserAPI = new UserAPI(this.api);
  serviceAPI: ServiceAPI = new ServiceAPI(this.api);
  productAPI: ProductAPI = new ProductAPI(this.api);
  autAPI: AutAPI = new AutAPI(this.api);
  servicesLocationAPI: ServicesLocationAPI = new ServicesLocationAPI(this.api);
  orderformAPI: OrderformAPI = new OrderformAPI(this.api);
  incomeAPI: IncomeAPI = new IncomeAPI(this.api);
  expenseAPI: ExpenseAPI = new ExpenseAPI(this.api);
  smstemplateAPI: SmstemplateAPI = new SmstemplateAPI(this.api);
}
