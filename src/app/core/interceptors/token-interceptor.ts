import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../services/stateful/session';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private sessionService: Session) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Basic fallback if getToken doesn't exist yet on Session default
    const token = (this.sessionService as any).getToken ? (this.sessionService as any).getToken() : null;

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request);
  }
}
