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
import { SmstemplatesDTO } from '../models/smstemplates.DTO';

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
  public getAppointments(): Observable<AppointmentsDTO[]> {
    return this.httpClient.get<AppointmentsDTO[]>(
      `${this._environment.appointmentAPI.BASE_URL}`
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

  //#region  This regison is for the end poinst of the SmstemplatesController(
  public getSmstemplates(): Observable<SmstemplatesDTO[]> {
    return this.httpClient.get<SmstemplatesDTO[]>(
      `${this._environment.smstemplateAPI.BASE_URL}`
    );
  }
  public getSmstemplate(id: number): Observable<SmstemplatesDTO> {
    return this.httpClient.get<SmstemplatesDTO>(
      `${this._environment.customerAPI.BASE_URL}/${id}`
    );
  }
  public putSmstemplates(
    id: number,
    dto: SmstemplatesDTO
  ): Observable<SmstemplatesDTO> {
    return this.httpClient.put<SmstemplatesDTO>(
      `${this._environment.smstemplateAPI.BASE_URL}/${id}`,
      dto
    );
  }
  public postSmstemplates(dto: SmstemplatesDTO): Observable<SmstemplatesDTO> {
    return this.httpClient.post<SmstemplatesDTO>(
      `${this._environment.smstemplateAPI.BASE_URL}`,
      dto
    );
  }
  public deleteSmstemplates(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(
      `${this._environment.smstemplateAPI.BASE_URL}/${id}`
    );
  }
  //#endregion
}
