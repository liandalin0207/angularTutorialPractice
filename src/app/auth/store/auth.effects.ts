import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, mergeMap, tap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';
import * as AuthReducers from './auth.reducers';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthEffects {
    // @Effect()
    // authSignup = this.actions$.pipe(
    //     ofType(AuthActions.TRY_SIGNUP),
    //     map(
    //         (action: AuthActions.TrySignup) => {
    //             return action.payloads;
    //         }
    //     ),
    //     switchMap((authData: {username: string, password: string}) => {
    //         return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
    //     }),
    //     switchMap(() => {
    //         return fromPromise(firebase.auth().currentUser.getIdToken());
    //     }),
    //     mergeMap((token: string) => {
    //         this.router.navigate(['/']);
    //         return [
    //             {
    //                 type: AuthActions.SIGNUP
    //             },
    //             {
    //                 type: AuthActions.SET_TOKEN,
    //                 payload: token
    //             }
    //         ];
    //     })
    // );

    constructor(
        private actions$: Actions,
        private router: Router,
        private store: Store<AuthReducers.AuthState>) {}

    authSignup$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(AuthActions.trySignup),
            switchMap(action =>
                fromPromise(firebase.auth().createUserWithEmailAndPassword(action.username, action.password))
            ),
            switchMap(() =>
                fromPromise(firebase.auth().currentUser.getIdToken())
            ),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    AuthActions.signup(),
                    AuthActions.setToken({payload: token})
                ];
            })
        )
    );

    // @Effect()
    // authSignin = this.actions$.pipe(
    //     ofType(AuthActions.TRY_SIGNIN),
    //     map(
    //         (action: AuthActions.TrySignin) => {
    //             return action.payloads;
    //         }
    //     ),
    //     switchMap((authData: {username: string, password: string}) => {
    //         return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
    //     }),
    //     switchMap(() => {
    //         return fromPromise(firebase.auth().currentUser.getIdToken());
    //     }),
    //     mergeMap((token: string) => {
    //         this.router.navigate(['/']);
    //         return [
    //             {
    //                 type: AuthActions.SIGNIN
    //             },
    //             {
    //                 type: AuthActions.SET_TOKEN,
    //                 payload: token
    //             }
    //         ];
    //     })
    // );

    authSignin$ = createEffect((): any =>
        this.actions$.pipe(
            ofType(AuthActions.trySignin),
            switchMap(action =>
                fromPromise(firebase.auth().signInWithEmailAndPassword(action.username, action.password))
            ),
            switchMap(() =>
                fromPromise(firebase.auth().currentUser.getIdToken())
            ),
            mergeMap((token: string) => {
                this.router.navigate(['/']);
                return [
                    AuthActions.signin(),
                    AuthActions.setToken({payload: token})
                ];
            })
        )
    );

    // @Effect({dispatch: false})
    // authLogout = this.actions$.pipe(
    //     ofType(AuthActions.LOGOUT),
    //     tap(() => {
    //         this.router.navigate(['/']);
    //     })
    // );

    authLogout$ = createEffect(() =>
      this.actions$.pipe(
          ofType(AuthActions.logout),
          tap(() => this.router.navigate(['/']))
      ),
      { dispatch: false }
    );
}
