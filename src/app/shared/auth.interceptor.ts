import { Store } from '@ngrx/store';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from '../auth/store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private store: Store<fromApp.AppState>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted ', req);
        // const copiedReq = req.clone({headers: req.headers.append('', '')});
        return this.store.select('auth')
            .take(1)
            .switchMap(
                (authState: fromAuth.AuthState) => {
                    const copiedReq = req.clone({params: req.params.append('auth', authState.token)});
                    return next.handle(copiedReq);
                }
            );
        // return null;
    }
}