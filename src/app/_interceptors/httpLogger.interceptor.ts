import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import { LogService } from '../_services/log.service';

@Injectable()
export class HttpLoggerInterceptor implements HttpInterceptor {
    public intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const start = Date.now();
        LogService.logHttpRequest(request);
        return next.handle(request).pipe(
            tap(
                response => {
                    const end = Date.now();
                    if (response instanceof HttpResponse) {
                        LogService.logHttpResponse(response, end - start);
                    }
                },
                error => LogService.logHttpError(error)
            )
        );
    }
}
