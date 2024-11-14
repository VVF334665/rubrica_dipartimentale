import { createSelector } from '@ngrx/store';

// creo selettore
const selectUsersState = (state: any) => state.users;

export const selectUsersList = createSelector(
    selectUsersState,
    (state) => state.usersList
);

export const selectUtenteDaModificare = createSelector(
    selectUsersState,
    (state) => state.utenteDaModificare
);

/*
export const selectLoggedUser = createSelector(
    selectAuthUserState,
    (state) => state.decodeToken
);

export const setToken = createSelector(
    selectAuthUserState,
    (state) => state
)
*/
