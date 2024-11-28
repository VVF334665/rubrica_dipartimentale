import { createSelector } from '@ngrx/store';

// creo selettore
const selectAuthUserState = (state: any) => state.authUser;

export const existUserLogged = createSelector(
    selectAuthUserState,
    (state) => state.token != ""
);

export const selectAuthUser = createSelector(
    selectAuthUserState,
    (state) => state
);

export const selectLoggedUser = createSelector(
    selectAuthUserState,
    (state) => state.decodeToken
);

export const setToken = createSelector(
    selectAuthUserState,
    (state) => state
)

//import { IAppState } from '../states/app.state';
//import { IAuthUserState } from '../states/authuser.state';

/*const utenteLoggato = (state: IAppState) => state.authUser;

export const GetUtenteLoggato = createSelector(
  utenteLoggato,
  (state: IAuthUserState) => state.loggedUser
);

export const GetIdUtenteLoggato = createSelector(
  utenteLoggato,
  (state: IAuthUserState) => state.idLoggedUser
);
*/

