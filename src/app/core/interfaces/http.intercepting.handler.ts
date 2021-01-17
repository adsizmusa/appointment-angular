import { HttpHandler, HttpBackend, HttpRequest, HttpEvent, HTTP_INTERCEPTORS, HttpInterceptor, HttpXhrBackend } from '@angular/common/http';
import { Injector, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class HttpInterceptorHandler implements HttpHandler {
    constructor(private next: HttpHandler, private interceptor: HttpInterceptor) {}

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        return this.interceptor.intercept(req, this.next);
    }
}

export class HttpInterceptingHandler implements HttpHandler {
    private chain: HttpHandler | null = null;

    private httpBackend: HttpHandler;
    
    constructor(private injector: Injector) {
        this.httpBackend = new HttpXhrBackend({ build: () => new XMLHttpRequest });
    }

    handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
        if (this.chain === null) {
            const interceptors = this.injector.get(HTTP_INTERCEPTORS, []);
            this.chain = interceptors.reduceRight((next, interceptor) => new HttpInterceptorHandler(next,interceptor),this.httpBackend);
        }
        return this.chain.handle(req);
    }
}