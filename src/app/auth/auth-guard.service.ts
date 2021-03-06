import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import * as fromApp from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private store: Store<fromApp.AppState>) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
            .take(1)
            .map(
                (authState: fromAuth.AuthState) => {
                    return authState.authenticated;
                }
        );
    }
}