import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from "rxjs";

@Injectable()
export class SpinnerInterceptor implements HttpInterceptor {
  private _requestCount: number = 0;

  excludeUrl: string[] = ["version.json", "RegisterTranslations"];

  constructor(private spinner: NgxSpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const me = this;

    me.showLoader(req);

    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          me.hideLoader(req);
        }
      }),
      catchError((err) => {
        me._requestCount = 0;
        me.spinner.hide();

        return throwError(err);
      })
    );
  }

  showLoader(req: HttpRequest<any>) {
    const me = this;

    if (me.isExcludeUrl(req) == false) {
      me._requestCount++;
      me.spinner.show();
    }
  }

  hideLoader(req: HttpRequest<any>) {
    const me = this;

    if (me.isExcludeUrl(req) == false) {
      me._requestCount--;

      if (me._requestCount <= 0) {
        me.spinner.hide();
      }
    }
  }

  private isExcludeUrl(req: HttpRequest<any>): boolean {
    return this.excludeUrl.find((x) => req.url.indexOf(x) > -1) ? true : false;
  }
}
