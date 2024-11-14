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


export const selectProfile = createSelector(
    selectUsersState,
    (state) => state.profileList
);

/*
export const setToken = createSelector(
    selectAuthUserState,
    (state) => state
)
*/
