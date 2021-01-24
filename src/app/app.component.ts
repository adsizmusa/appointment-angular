import { Component } from '@angular/core';
import { BaseControl } from './views/base.control';
import { SlideService } from './core/services/slide.service';
import { AuthService } from './core/services/auth.service';
import { take, takeUntil } from 'rxjs/operators';
import { CompanyService } from './core/services/company.service';
import { TranstationService } from './core/services/transtation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends BaseControl {
  title = 'appointment-angular';

  constructor(
    public authService: AuthService,
    public slideService: SlideService,
    private transtationService: TranstationService,
    public companyService: CompanyService
  ) {
    super();
    const me = this;
    transtationService.setLanguage('tr');

    me.authService.isLoggedIn
      .pipe(takeUntil(me.ngUnSubscribe))
      .subscribe((login) => {
        if (
          login === false ||
          (login == null && me.authService.hasAuthenticate === false)
        ) {
          me.authService.clearLocalStorage();
          me.authService.router.navigate(['/login']);
        } else {
          var userId = me.authService.storageService.user.id;
          me.companyService
            .getRights(userId)
            .pipe(takeUntil(me.ngUnSubscribe))
            .subscribe((rights) => {
              me.slideService.rightsDTO = rights;
            });
        }
      });
  }
  changeCostumer(e) {
    const me = this;
    var company = e.itemData;
    me.authService.storageService.company = company;
    me.slideService.slideProperties.isDrawerOpen = false;
    me.slideService._reloadPage();
  }
}
