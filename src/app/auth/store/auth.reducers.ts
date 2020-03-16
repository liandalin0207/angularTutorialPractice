import * as AuthActions from './auth.actions';
import { createReducer, on, Action } from '@ngrx/store';

export interface AuthState {
    token: string;
    authenticated: boolean;
}

const initialAuthState = {
    token: null,
    authenticated: false
};

// export function authReducer(state = initialState, action: AuthActions.AuthActions) {
//     switch (action.type) {
//         case AuthActions.SIGNUP:
//         case AuthActions.SIGNIN:
//             return {
//                 ...state,
//                 authenticated: true
//             };
//         case AuthActions.LOGOUT:
//             return {
//                 ...state,
//                 token: null,
//                 authenticated: false
//             };
//         case AuthActions.SET_TOKEN:
//             return {
//                 ...state,
//                 token: action.payload
//             };
//         default:
//             return state;
//     }
// }

export const authReducer = createReducer(
    initialAuthState,
    on(AuthActions.signup, state => ({
        ...state,
        authenticated: true
    })),
    on(AuthActions.signin, state => ({
        ...state,
        authenticated: true
    })),
    on(AuthActions.logout, state => ({
        ...state,
        token: null,
        authenticated: false
    })),
    on(AuthActions.setToken, (state, {payload}) => ({
        ...state,
        token: payload
    }))
);
