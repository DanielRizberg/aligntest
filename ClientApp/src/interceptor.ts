import { Injectable } from '@angular/core';
import { HttpXsrfTokenExtractor, HttpRequest, HttpHandler, HttpInterceptor } from '@angular/common/http';

@Injectable()
export class InsertAuthTokenInterceptor implements HttpInterceptor {
    constructor( private xsrfTokenExtractor: HttpXsrfTokenExtractor) {
    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let xsrfToken = this.xsrfTokenExtractor.getToken();
        console.log(xsrfToken)
        if (req.method == "POST" && xsrfToken) {
            const authorizedRequest = req.clone({
                withCredentials: true,
                headers: req.headers.set("X-XSRF-TOKEN", xsrfToken)
            });
            return next.handle(authorizedRequest);
        } else {
           return  next.handle(req);
        }
    }
}