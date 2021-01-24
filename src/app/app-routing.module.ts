import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { LoginComponent } from './views/login/login.component';
import { CompanyComponent } from './views/company/company.component';
import { CustomerComponent } from './views/customer/customer.component';
import { UserComponent } from './views/user/user.component';
import { ServiceComponent } from './views/service/service.component';
import { ServicesLocationComponent } from './views/services-location/services-location.component';
import { OrderformComponent } from './views/orderform/orderform.component';
import { SmstemplateComponent } from './views/smstemplate/smstemplate.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointment', component: AppointmentComponent },
  { path: 'company', component: CompanyComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'user', component: UserComponent },
  { path: 'service', component: ServiceComponent },
  { path: 'service-location', component: ServicesLocationComponent },
  { path: 'orderform', component: OrderformComponent },
  { path: 'smstemplate', component: SmstemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
