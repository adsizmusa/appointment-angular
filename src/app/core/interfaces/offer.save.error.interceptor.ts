import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { alert } from "devextreme/ui/dialog";

@Injectable()
export class OfferSaveErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const me = this;

    return next.handle(req).pipe(
      catchError(err => {
        if (err.error) {
          if (
            err.error instanceof Object &&
            (err.error.customJsonObject || err.error.CustomJsonObject)
          ) {
            const customJsonObject =
              err.error.customJsonObject || err.error.CustomJsonObject;
            let roomErrorMessages: string[] = (
              customJsonObject.roomValidationResults ||
              customJsonObject.RoomValidationResults ||
              []
            ).map(x => x.error || x.Error);
            let locationErrorMessages: string[] = (
              customJsonObject.locationValidationResults ||
              customJsonObject.LocationValidationResults ||
              []
            ).map(x => x.error || x.Error);

            if (
              roomErrorMessages.length > 0 ||
              locationErrorMessages.length > 0
            ) {
              const messages: string = roomErrorMessages
                .concat(locationErrorMessages)
                .join("\r\n");
              alert(
                messages.replace(new RegExp("\r?\n", "g"), "<br />"),
                "Offer"
              );
            } else if (customJsonObject.error || customJsonObject.Error) {
              alert(customJsonObject.error || customJsonObject.Error, "Offer");
            }
          } else if (
            err.error.UserFriendlyMessage &&
            err.error.UserFriendlyMessage.indexOf("UX_Guest_Login_Unique") > -1
          )
            var i = 1;
          else if (
            err.error.userFriendlyMessage ||
            err.error.shortDescription ||
            err.error.UserFriendlyMessage ||
            err.error.ShortDescription
          ) {
            const message: string =
              err.error.userFriendlyMessage ||
              err.error.shortDescription ||
              err.error.UserFriendlyMessage ||
              err.error.ShortDescription;
            alert(message.replace(new RegExp("\r?\n", "g"), "<br />"), "Offer");
          }
        }

        return throwError(err);
      })
    );
  }
}
