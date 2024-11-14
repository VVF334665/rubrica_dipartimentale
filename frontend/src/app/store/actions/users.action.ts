import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/IUser';

export enum UsersActionType {
    GetUsers = '[Get Users] Get Users',
    GetUsersSuccess = '[Get Users] Get Users Success',
    GetUsersError = '[Get Users] Get Users Error',

    DelUser = '[Del User] Del User',
    DelUserSuccess = '[Del User] Del User Success',
    DelUserError = '[Del User] Del User Error',

    SetUserDaModificare = '[Set User Da Modificare] Set User da Modificare',
    SetUserDaModificareSuccess = '[Set User Da Modificare] Set User da Modificare Success',
    SetUserDaModificareError = '[Set User Da Modificare] Set User da Modificare Error',
}

export const GetUsers = createAction(
    UsersActionType.GetUsers
);

export const GetLoggedUserSuccess = createAction(
    UsersActionType.GetUsersSuccess
);

export const GetLoggedUserError = createAction(
    UsersActionType.GetUsersError
);

export const DelUser = createAction(
    UsersActionType.DelUser,
    props<{ id: number }>()
);

export const DelUserSuccess = createAction(
    UsersActionType.DelUserSuccess
);

export const DelUserError = createAction(
    UsersActionType.DelUserError
);

export const SetUserDaModificare = createAction(
    UsersActionType.SetUserDaModificare,
    props<{ user: IUser }>()
);

export const SetUserDaModificareSuccess = createAction(
    UsersActionType.SetUserDaModificareSuccess
);

export const SetUserDaModificareError = createAction(
    UsersActionType.SetUserDaModificareError
);
