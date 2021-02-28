import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AppointmentsDTO } from '../models/appointments.DTO';
import { CompaniesDTO } from '../models/companies.DTO';
import { CustomersDTO } from '../models/customers.DTO';
import { UsersDTO } from '../models/users.DTO';
import { ServicesDTO } from '../models/services.DTO';
import { ServiceLocationsDTO } from '../models/service.locations.DTO';
import { OrderFormsDTO } from '../models/orderforms.DTO';
import { RightsDTO } from '../models/right.DTO';
import { SchedulerDTO } from '../models/scheduler.DTO';
import { spCompanyMenus } from '../models/sp.company.menus';
import { SpUserMenus } from '../models/sp.user.menus';
import { ProductsDTO } from '../models/products.DTO';
import { IncomesDTO } from '../models/incomes.DTO';
import { ExpensesDTO } from '../models/expenses.DTO';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected ngUnSubscribe = new Subject();
  _environment: environment = new environment();
  constructor(protected httpClient: HttpClient) {}

  public getRights(userId: number): Observable<RightsDTO> {
    return this.httpClient.get<RightsDTO>(
      `${this._environment.userAPI.getUserRights}?userId=${userId}`
    );
  }
  public getCompanyMenus(companyId: number): Observable<spCompanyMenus[]> {
    return this.httpClient.get<spCompanyMenus[]>(
      `${this._environment.companyAPI.getCompanyMenus}?companyId=${companyId}`
    );
  }
  public updateCompanyMenus(companyMenus: spCompanyMenus[]): Observable<void> {
    return this.httpClient.put<void>(
      `${this._environment.companyAPI.updateCompanyMenus}`,
      companyMenus
    );
  }
  public getUserMenus(userID: number): Observable<SpUserMenus[]> {
    return this.httpClient.get<SpUserMenus[]>(
      `${this._environment.userAPI.getUserMenus}?userID=${userID}`
    );
  }
  public updateUserMenus(userMenus: SpUserMenus[]): Observable<void> {
    return this.httpClient.put<void>(
      `${this._environment.userAPI.updateUserMenus}`,
      userMenus
    );
  }
  //#region  This regison is for the end poinst of the appointmentsControllers
  public getAppointments(userIds?: number[]): Observable<AppointmentsDTO[]> {
    return this.httpClient.post<AppointmentsDTO[]>(
      `${this._environment.appointmentAPI.getAppointments}`,
      userIds
    );
  }
  public getScheduler(): Observable<SchedulerDTO> {
    return this.httpClient.get<SchedulerDTO>(
      `${this._environment.appointmentAPI.getScheduler}`
    );
  }
  public getAppointment(id: number): Observable<AppointmentsDTO> {
    return this.httpClient.get<AppointmentsDTO>(
      `${this._environment.appointmentAPI.BASE_URL}/${id}`
    );
  }
  public putAppointments(
    id: number,
    appointmentsDTO: AppointmentsDTO
  ): Observable<AppointmentsDTO> {
    return this.httpClient.put<AppointmentsDTO>(
      `${this._environment.appointmentAPI.BASE_URL}/${id}`,
      appointmentsDTO
    );
  }
  public postAppointments(
    appointmentsDTO: AppointmentsDTO
  ): Observable<AppointmentsDTO> {
    return this.httpClient.post<AppointmentsDTO>(
      `${this._environment.appointmentAPI.BASE_URL}`,
      appointmentsDTO
    );
  }
  public deleteAppointments(id: number): Observable<AppointmentsDTO> {
    return this.httpClient.delete<AppointmentsDTO>(
      `${this._environment.appointmentAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the CompaniesController(
  public getCompanies(): Observable<CompaniesDTO[]> {
    return this.httpClient.get<CompaniesDTO[]>(
      `${this._environment.companyAPI.BASE_URL}`
    );
  }
  public getCompany(id: number): Observable<CompaniesDTO> {
    return this.httpClient.get<CompaniesDTO>(
      `${this._environment.companyAPI.BASE_URL}/${id}`
    );
  }
  public putCompanies(id: number, dto: CompaniesDTO): Observable<CompaniesDTO> {
    return this.httpClient.put<CompaniesDTO>(
      `${this._environment.companyAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postCompanies(dto: CompaniesDTO): Observable<CompaniesDTO> {
    return this.httpClient.post<CompaniesDTO>(
      `${this._environment.companyAPI.BASE_URL}`,
      dto
    );
  }
  public deleteCompanies(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.companyAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the CustomersController(
  public getCustomers(): Observable<CustomersDTO[]> {
    return this.httpClient.get<CustomersDTO[]>(
      `${this._environment.customerAPI.BASE_URL}`
    );
  }
  public getCustomer(id: number): Observable<CustomersDTO> {
    return this.httpClient.get<CustomersDTO>(
      `${this._environment.customerAPI.BASE_URL}/${id}`
    );
  }
  public putCustomers(id: number, dto: CustomersDTO): Observable<CustomersDTO> {
    return this.httpClient.put<CustomersDTO>(
      `${this._environment.customerAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postCustomers(dto: CustomersDTO): Observable<CustomersDTO> {
    return this.httpClient.post<CustomersDTO>(
      `${this._environment.customerAPI.BASE_URL}`,
      dto
    );
  }
  public deleteCustomers(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.customerAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the UsersController(
  public getUsers(): Observable<UsersDTO[]> {
    return this.httpClient.get<UsersDTO[]>(
      `${this._environment.userAPI.BASE_URL}`
    );
  }
  public getUser(id: number): Observable<UsersDTO> {
    return this.httpClient.get<UsersDTO>(
      `${this._environment.userAPI.BASE_URL}/${id}`
    );
  }
  public putUsers(id: number, dto: UsersDTO): Observable<UsersDTO> {
    return this.httpClient.put<UsersDTO>(
      `${this._environment.userAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postUsers(dto: UsersDTO): Observable<UsersDTO> {
    return this.httpClient.post<UsersDTO>(
      `${this._environment.userAPI.BASE_URL}`,
      dto
    );
  }
  public deleteUsers(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.userAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the ServicesController(
  public getServices(): Observable<ServicesDTO[]> {
    return this.httpClient.get<ServicesDTO[]>(
      `${this._environment.serviceAPI.BASE_URL}`
    );
  }
  public getService(id: number): Observable<ServicesDTO> {
    return this.httpClient.get<ServicesDTO>(
      `${this._environment.serviceAPI.BASE_URL}/${id}`
    );
  }
  public putServices(id: number, dto: ServicesDTO): Observable<ServicesDTO> {
    return this.httpClient.put<ServicesDTO>(
      `${this._environment.serviceAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postServices(dto: ServicesDTO): Observable<ServicesDTO> {
    return this.httpClient.post<ServicesDTO>(
      `${this._environment.serviceAPI.BASE_URL}`,
      dto
    );
  }
  public deleteServices(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.serviceAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the ServiceLocationsController(
  public getServiceLocations(): Observable<ServiceLocationsDTO[]> {
    return this.httpClient.get<ServiceLocationsDTO[]>(
      `${this._environment.servicesLocationAPI.BASE_URL}`
    );
  }
  public getServiceLocation(id: number): Observable<ServiceLocationsDTO> {
    return this.httpClient.get<ServiceLocationsDTO>(
      `${this._environment.servicesLocationAPI.BASE_URL}/${id}`
    );
  }
  public putServiceLocations(
    id: number,
    dto: ServiceLocationsDTO
  ): Observable<ServiceLocationsDTO> {
    return this.httpClient.put<ServiceLocationsDTO>(
      `${this._environment.servicesLocationAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postServiceLocations(
    dto: ServiceLocationsDTO
  ): Observable<ServiceLocationsDTO> {
    return this.httpClient.post<ServiceLocationsDTO>(
      `${this._environment.servicesLocationAPI.BASE_URL}`,
      dto
    );
  }
  public deleteServiceLocations(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.servicesLocationAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the OrderFormsController(
  public getOrderForms(): Observable<OrderFormsDTO[]> {
    return this.httpClient.get<OrderFormsDTO[]>(
      `${this._environment.orderformAPI.BASE_URL}`
    );
  }
  public getOrderForm(id: number): Observable<OrderFormsDTO> {
    return this.httpClient.get<OrderFormsDTO>(
      `${this._environment.orderformAPI.BASE_URL}/${id}`
    );
  }
  public putOrderForms(
    id: number,
    dto: OrderFormsDTO
  ): Observable<OrderFormsDTO> {
    return this.httpClient.put<OrderFormsDTO>(
      `${this._environment.orderformAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postOrderForms(dto: OrderFormsDTO): Observable<OrderFormsDTO> {
    return this.httpClient.post<OrderFormsDTO>(
      `${this._environment.orderformAPI.BASE_URL}`,
      dto
    );
  }
  public deleteOrderForms(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.orderformAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regison is for the end poinst of the ProductsController(
  public getProducts(): Observable<ProductsDTO[]> {
    return this.httpClient.get<ProductsDTO[]>(
      `${this._environment.productAPI.BASE_URL}`
    );
  }
  public getProduct(id: number): Observable<ProductsDTO> {
    return this.httpClient.get<ProductsDTO>(
      `${this._environment.productAPI.BASE_URL}/${id}`
    );
  }
  public putProducts(id: number, dto: ProductsDTO): Observable<ProductsDTO> {
    return this.httpClient.put<ProductsDTO>(
      `${this._environment.productAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postProducts(dto: ProductsDTO): Observable<ProductsDTO> {
    return this.httpClient.post<ProductsDTO>(
      `${this._environment.productAPI.BASE_URL}`,
      dto
    );
  }
  public deleteProducts(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.productAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regions is for the end poinst of the IncomesController(
  public getIncomes(): Observable<IncomesDTO[]> {
    return this.httpClient.get<IncomesDTO[]>(
      `${this._environment.incomeAPI.BASE_URL}`
    );
  }
  public getIncome(id: number): Observable<IncomesDTO> {
    return this.httpClient.get<IncomesDTO>(
      `${this._environment.incomeAPI.BASE_URL}/${id}`
    );
  }
  public putIncomes(id: number, dto: IncomesDTO): Observable<IncomesDTO> {
    return this.httpClient.put<IncomesDTO>(
      `${this._environment.incomeAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postIncomes(dto: IncomesDTO): Observable<IncomesDTO> {
    return this.httpClient.post<IncomesDTO>(
      `${this._environment.incomeAPI.BASE_URL}`,
      dto
    );
  }
  public deleteIncomes(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.incomeAPI.BASE_URL}/${id}`
    );
  }
  //#endregion

  //#region  This regions is for the end poinst of the ExpensesController(
  public getExpenses(): Observable<ExpensesDTO[]> {
    return this.httpClient.get<ExpensesDTO[]>(
      `${this._environment.expenseAPI.BASE_URL}`
    );
  }
  public getExpense(id: number): Observable<ExpensesDTO> {
    return this.httpClient.get<ExpensesDTO>(
      `${this._environment.expenseAPI.BASE_URL}/${id}`
    );
  }
  public putExpenses(id: number, dto: ExpensesDTO): Observable<ExpensesDTO> {
    return this.httpClient.put<ExpensesDTO>(
      `${this._environment.expenseAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postExpenses(dto: ExpensesDTO): Observable<ExpensesDTO> {
    return this.httpClient.post<ExpensesDTO>(
      `${this._environment.expenseAPI.BASE_URL}`,
      dto
    );
  }
  public deleteExpenses(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.expenseAPI.BASE_URL}/${id}`
    );
  }
  //#endregion
}
