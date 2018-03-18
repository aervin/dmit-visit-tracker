import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

/* tslint:disable no-console quotemark */
@Injectable()
export class LogService {
    public static log(caller: string, toBeLogged: any): void {
        const now = new Date();
        console.groupCollapsed(
            `%c${now.toLocaleTimeString()} | ${caller} says:`,
            'background: black; color: white; padding: 2px 4px;'
        );
        console.log(toBeLogged);
        console.groupEnd();
    }

    public static logHttpRequest(request: HttpRequest<any>): void {
        const now = new Date();
        console.groupCollapsed(
            `%c${now.toLocaleTimeString()} | [HTTP REQUEST] | ${
                request.url.split('api')[1]
            }`,
            'background: #0d47a1; color: white; padding: 2px 4px;'
        );
        console.log(request.method.toLocaleUpperCase());
        console.log(request.url);
        if (request.params !== null && request.params.toString().length > 0) {
            console.log('Params:');
            console.log(request.params.toString());
        } else if (request.body !== null && JSON.stringify(request.body).length < 200) {
            console.log('Request body:');
            console.log(request.body);
        } else {
            console.log("%cNothin' sent with this request", 'font-style: italic;');
        }
        console.groupEnd();
    }

    public static logHttpResponse(response: HttpResponse<any>, duration: number): void {
        const now = new Date();
        console.groupCollapsed(
            `%c${now.toLocaleTimeString()} | [HTTP RESPONSE] | ${
                response.url.split('api')[1]
            }`,
            'background: #0da168; color: white; padding: 2px 4px;'
        );
        console.log(response.url);
        console.log(response.status);
        console.log('Response body:');
        if (JSON.stringify(response.body).length < 5000) {
            console.log(response.body);
        } else {
            console.log(
                "%cResponse too frinkin' large for this console!",
                'font-style: italic;'
            );
        }
        console.log(`${duration}ms`);
        console.groupEnd();
    }

    public static logHttpError(error: HttpErrorResponse): void {
        const now = new Date();
        console.groupCollapsed(
            `%c${now.toLocaleTimeString()} | [HTTP ERROR] | ${
                error.url ? error.url.split('api')[1] : undefined
            }`,
            'background: #d42424; color: white; padding: 2px 4px;'
        );
        console.log(error.url || undefined);
        console.log(error.status || undefined);
        console.log(error.message || 'No message!');
        console.groupEnd();
    }
}
