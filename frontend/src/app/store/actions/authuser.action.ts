import { createAction, props } from '@ngrx/store';

export enum AuthUserActionType {
    GetAuthToken = '[Get Token] Get Token',
    GetAuthTokenSuccess = '[Get Token] Get Token Success',
    GetAuthTokenError = '[Get Token] Get Token Error',

    SetAuthToken = '[Set Token] Set Token',
    SetAuthTokenSuccess = '[Set Token] Set Token Success',
    SetAuthTokenError = '[Set Token] Set Token Error',

    GetLoggedUser = '[AuthUser] Carica utente loggato',
    GetLoggedUserSuccess = '[AuthUser] Carica utente loggato con successo',
    GetLoggedUserError = '[AuthUser] Errore carica utente loggato',

    RemoveAuthToken = '[AuthUser] Rimozione utente loggato'
}

export const GetLoggedUser = createAction(
    AuthUserActionType.GetLoggedUser
);

export const GetLoggedUserSuccess = createAction(
    AuthUserActionType.GetLoggedUserSuccess
);

export const GetLoggedUserError = createAction(
    AuthUserActionType.GetLoggedUserError
);


export const SetAuthToken = createAction(
    AuthUserActionType.SetAuthToken,
    props<{ token: string}>()
);

export const SetAuthTokenSuccess = createAction(
    AuthUserActionType.SetAuthTokenSuccess
);

export const SetAuthTokenError = createAction(
    AuthUserActionType.SetAuthTokenError
);


export const RemoveAuthToken = createAction(
    AuthUserActionType.RemoveAuthToken
);
