import { Component, OnInit } from '@angular/core';
import { BaseControl } from '../base.control';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoginDTO } from 'src/app/core/models/login.DTO';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent extends BaseControl implements OnInit {
  login: LoginDTO = new LoginDTO();

  hide: boolean = true;

  invalidLogin: boolean;
  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {}
  signIn(e) {
    const me = this;

    me.authService.login(me.login).subscribe(
      (result) => {
        if (result && result.token) {
          me.authService.isFirstLogin = !me.authService.storageService.token;
          // me.authService.storageService.company = new Company({
          //   id: result.user.company.id,
          //   name: result.user.company.companyName,
          // });
          me.authService.storageService.token = result.token;
          me.authService.storageService.company = result.company;
          me.authService.storageService.user = result.user;
          // me.authService.storageService.system = me.login;
          // me.authService.storageService.employee = result.user;

          me.authService.loggedIn.next(true);

          let returnUrl = me.activatedRoute.snapshot.queryParamMap.get(
            'returnUrl'
          );

          if (returnUrl != null) {
            me.authService.router.navigate([returnUrl]);
          } else {
            me.authService.router.navigate(['/']);
          }
        } else {
          me.invalidLogin = true;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.status === 401) {
          me.invalidLogin = true;
        }
        console.log(err);
      }
    );
  }
}
