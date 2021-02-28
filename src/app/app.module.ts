import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DevextremeModule } from './devextreme.module';
import { HomeComponent } from './views/home/home.component';
import { AppointmentComponent } from './views/appointment/appointment.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './core/interfaces/auth.interceptor';
import { SpinnerInterceptor } from './core/interfaces/spinner.interceptor';
import { RedirectLoginInterceptor } from './core/interfaces/redirect.login.interceptor';
import { CustomTranslatePipe } from './core/pipes/custom.translate.pipe';
import { OfferSaveErrorInterceptor } from './core/interfaces/offer.save.error.interceptor';
import { AppointmentCreateAndUpdateComponent } from './views/appointment/appointment-create-and-update/appointment-create-and-update.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginComponent } from './views/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CompanyComponent } from './views/company/company.component';
import { CompanyCreateAndUpdateComponent } from './views/company/company-create-and-update/company-create-and-update.component';
import { CustomerComponent } from './views/customer/customer.component';
import { CustomerCreateAndUpdateComponent } from './views/customer/customer-create-and-update/customer-create-and-update.component';
import { UserComponent } from './views/user/user.component';
import { UserCreateAndUpdateComponent } from './views/user/user-create-and-update/user-create-and-update.component';
import { ServicesLocationComponent } from './views/services-location/services-location.component';

import { ServiceComponent } from './views/service/service.component';
import { ServiceCreateAndUpdateComponent } from './views/service/service-create-and-update/service-create-and-update.component';
import { ServiceLocationCreateAndUpdateComponent } from './views/services-location/service-location-create-and-update/service-location-create-and-update.component';
import { OrderformComponent } from './views/orderform/orderform.component';
import { OrderformCreateAndUpdateComponent } from './views/orderform/orderform-create-and-update/orderform-create-and-update.component';
import { UserMenuComponent } from './views/user/user-menu/user-menu.component';
import { CompanyMenuComponent } from './views/company/company-menu/company-menu.component';
import { CompanyService } from './core/services/company.service';
import { ProductComponent } from './views/product/product.component';
import { ProductCreateAndUpdateComponent } from './views/product/product-create-and-update/product-create-and-update.component';
import { IncomeComponent } from './views/income/income.component';
import { IncomeCreateAndUpdateComponent } from './views/income/income-create-and-update/income-create-and-update.component';
import { ExpenseComponent } from './views/expense/expense.component';
import { ExpenseCreateAndUpdateComponent } from './views/expense/expense-create-and-update/expense-create-and-update.component';
import { SmstemplateComponent } from './views/smstemplate/smstemplate.component';
import { SmstemplateCreateAndUpdateComponent } from './views/smstemplate/smstemplate-create-and-update/smstemplate-create-and-update.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppointmentComponent,
    AppointmentCreateAndUpdateComponent,
    LoginComponent,
    CompanyComponent,
    CompanyCreateAndUpdateComponent,
    CustomerComponent,
    CustomerCreateAndUpdateComponent,
    UserComponent,
    UserCreateAndUpdateComponent,
    ServicesLocationComponent,
    ServiceComponent,
    ServiceCreateAndUpdateComponent,
    ServiceLocationCreateAndUpdateComponent,
    OrderformComponent,
    OrderformCreateAndUpdateComponent,
    UserMenuComponent,
    CompanyMenuComponent,
    ProductComponent,
    ProductCreateAndUpdateComponent,
    IncomeComponent,
    IncomeCreateAndUpdateComponent,
    ExpenseComponent,
    ExpenseCreateAndUpdateComponent,
    SmstemplateComponent,
    SmstemplateCreateAndUpdateComponent,
  ],
  exports: [
    //...
    TranslateModule,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    DevextremeModule,
    NgxSpinnerModule,
    HttpClientModule,
    FormsModule,

    TranslateModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CustomTranslatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RedirectLoginInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OfferSaveErrorInterceptor,
      multi: true,
    },
    CompanyService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
