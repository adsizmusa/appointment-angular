import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _urlIncluded: string[] = [
    'localhost',
    'devwebapi.hotelboss.dk',
    'webapi.hotelboss.dk',
  ];

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._urlIncluded.findIndex((x) => request.url.includes(x)) != -1) {
      const authService = this.injector.get(AuthService);

      if (authService.storageService.token) {
        request = request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${authService.storageService.token}`
          ),
        });
      }

      if (authService.storageService.company) {
        request = request.clone({
          headers: request.headers.set(
            'companyID',
            authService.storageService.company.id.toString()
          ),
        });
      }
      if (authService.storageService.user) {
        request = request.clone({
          headers: request.headers.set(
            'userID',
            authService.storageService.user.id.toString().substring(0, 2)
          ),
        });
      }
      // var isMobile = '0';

      // request = request.clone({
      //   headers: request.headers.set('isMobile', isMobile),
      // });
    }

    return next.handle(request);
  }
}
