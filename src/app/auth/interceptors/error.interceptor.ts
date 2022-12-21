import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        let message: string = '';

        if (!navigator.onLine) {
          message = "You do not have an internet connection"
        }

        if (response.error.error) {
          switch (response.error.error.message) {
            case "EMAIL_EXISTS":
              message = "Email address already taken"
              break
            case "INVALID_EMAIL":
              message = "Invalid email"
              break
            case "INVALID_PASSWORD":
              message = "Wrong password"
              break
            default:
              message = "An unknown error occurred"
          }
        }

        const _err = new Error(message);
        return throwError(() => _err);
      })

    )
  }
}
