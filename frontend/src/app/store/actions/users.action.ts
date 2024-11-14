import { createAction, props } from '@ngrx/store';
import { IUser } from '../../models/IUser';

export enum UsersActionType {
    GetUsers = '[Get Users] Get Users',
    GetUsersSuccess = '[Get Users] Get Users Success',
    GetUsersError = '[Get Users] Get Users Error',

    DelUser = '[Del User] Del User',
    DelUserSuccess = '[Del User] Del User Success',
    DelUserError = '[Del User] Del User Error',

    SaveUser = '[Save User] Save User',
    SaveUserSuccess = '[Save User] Save User Success',
    SaveUserError = '[Save User] Save User Error',

    SetUserDaModificare = '[Set User Da Modificare] Set User da Modificare',
    SetUserDaModificareSuccess = '[Set User Da Modificare] Set User da Modificare Success',
    SetUserDaModificareError = '[Set User Da Modificare] Set User da Modificare Error',

    GetProfile = '[Get Profile] Get Profile',
    GetProfileSuccess = '[Get Profile] Get Profile Success',
    GetProfileError = '[Get Profile] Get Profile Error',
}

export const GetUsers = createAction(
    UsersActionType.GetUsers
);

export const GetUsersSuccess = createAction(
    UsersActionType.GetUsersSuccess
);

export const GetUsersError = createAction(
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

export const SaveUser = createAction(
    UsersActionType.SaveUser,
    props<{ user: IUser }>()
);

export const SaveUserSuccess = createAction(
    UsersActionType.SaveUserSuccess
);

export const SaveUserError = createAction(
    UsersActionType.SaveUserError
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

export const GetProfile = createAction(
    UsersActionType.GetProfile
);

export const GetProfileSuccess = createAction(
    UsersActionType.GetProfileSuccess
);

export const GetProfileError = createAction(
    UsersActionType.GetProfileError
);
