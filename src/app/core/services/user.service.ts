import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { UsersDTO } from '../models/users.DTO';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  usersDTOs: UsersDTO[] = [];
  constructor(protected httpClient: HttpClient) {
    super(httpClient);
    const me = this;
  }
  loadServices() {
    const me = this;
    me.getUsers()
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((data) => {
        me.usersDTOs = data.map((s) => {
          if (s.color == null || s.color == undefined) {
            s.color = '#fff';
          }
          return new UsersDTO(s);
        });
        var nada = true;
        // me.appointmentsDTOs = data;
      });
  }
}
