import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { DxPopupComponent } from 'devextreme-angular';
import { takeUntil } from 'rxjs/operators';
import { UsersDTO } from 'src/app/core/models/users.DTO';
import { UserService } from 'src/app/core/services/user.service';
import { BaseControl } from '../../base.control';

@Component({
  selector: 'app-user-create-and-update',
  templateUrl: './user-create-and-update.component.html',
  styleUrls: ['./user-create-and-update.component.css'],
})
export class UserCreateAndUpdateComponent
  extends BaseControl
  implements OnInit {
  usersDTO: UsersDTO = new UsersDTO();

  @ViewChild(DxPopupComponent, { static: true })
  private popup: DxPopupComponent;

  @Output()
  public popupClosed: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService) {
    super();
  }

  ngOnInit() {}
  show(UsersDTO: UsersDTO) {
    const me = this;
    me.usersDTO = UsersDTO;
    me.popup.instance.show();
  }
  _popUpShown() {
    const me = this;
  }
  _onSave() {
    const me = this;
    if (me.usersDTO.id == 0) {
      me.userService
        .postUsers(me.usersDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.userService.loadServices();
          me.popup.instance.hide();
        });
    } else {
      me.userService
        .putUsers(me.usersDTO.id, me.usersDTO)
        .pipe(takeUntil(me.ngUnSubscribe))
        .subscribe((appointmentsDTO) => {
          me.userService.loadServices();
          me.popup.instance.hide();
        });
    }
  }
  onChangeGender(e) {
    const me = this;

    me.usersDTO.gender = e.value.value;
  }
}
