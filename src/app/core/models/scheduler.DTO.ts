import { CustomersDTO } from './customers.DTO';
import { ServiceLocationsDTO } from './service.locations.DTO';
import { ServicesDTO } from './services.DTO';
import { UsersDTO } from './users.DTO';

export class SchedulerDTO {
  serviceLocationsDTOs: ServiceLocationsDTO[] = [];
  servicesDTOs: ServicesDTO[] = [];
  customersDTOs: CustomersDTO[] = [];
  usersDTOs: UsersDTO[] = [];
}
