import { AuthService } from './../auth/auth.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted ', req);
        // const copiedReq = req.clone({headers: req.headers.append('', '')});
        const copiedReq = req.clone({params: req.params.append('auth', this.authService.getToken())});
        return next.handle(copiedReq);
        // return null;
    }
}