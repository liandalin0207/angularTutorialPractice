import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import { fromPromise } from 'rxjs/observable/fromPromise';

import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

@Injectable()
export class AuthEffects {
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map(
            (action: AuthActions.TrySignup) => {
                return action.payloads;
            }
        ),
        switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        }),
        switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [
                {
                    type: AuthActions.SIGNUP
                },
                {
                    type: AuthActions.SET_TOKEN,
                    payload: token
                }
            ]
        })
    );

    constructor(private actions$: Actions) {}
}