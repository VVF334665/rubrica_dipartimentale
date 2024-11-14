import { UsersActionType } from '../actions/users.action';
import { initialUsersState, IUsersState } from '../states/users.state';

export function usersReducer(
    usersState: IUsersState = initialUsersState,
    action: any
) {
    let temp: IUsersState;
    temp = { ...usersState };

    switch (action.type) {
        case UsersActionType.GetUsersSuccess:
            temp['usersList'] = action.usersList;
            return temp;
        case UsersActionType.DelUser:
            console.log('Utente cancellato !!!!');
            return usersState;
        case UsersActionType.SetUserDaModificare:
            temp['utenteDaModificare'] = action.user;
            return temp;
        case UsersActionType.SetUserDaModificareSuccess:
            temp['utenteDaModificare'] = null;
            return temp;
        case UsersActionType.SaveUserSuccess:
            console.log("KKKKKKKKKKKKKKKK");
            temp['utenteDaModificare'] = null;
            return temp;
        case UsersActionType.GetProfileSuccess:
            temp['profileList'] = action.profileList;
            return temp;
        default:
            return usersState;
    }
}
