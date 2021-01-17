import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ServiceLocationsDTO } from '../models/service.locations.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceLocationService extends BaseService {
  serviceLocationsDTOs: ServiceLocationsDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getServiceLocations()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.serviceLocationsDTOs = data.map((s) => {
          return new ServiceLocationsDTO(s);
        });

        // me.appointmentsDTOs = data;
      });
  }
}
