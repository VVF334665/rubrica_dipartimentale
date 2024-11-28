//import { createReducer, createSelector, on } from '@ngrx/store';
//import * as AuthUserAction from '../actions/authuser.action';
import { environment } from '../../../environments/environment';
import { JwtService } from '../../services/jwt.service';
import { AuthUserActionType } from '../actions/authuser.action';
import { IAuthUserState, initialAuthState } from '../states/authuser.state';

export function authUserReducer(
    authUser: IAuthUserState = initialAuthState,
    action: any
) {
    const jwtKey = environment.jwtKey;

    //console.log('action type: ', action.type);

    switch (action.type) {
        //case AuthUserActionType.GetLoggedUser:
        //    return authUser.decodeToken;
        case AuthUserActionType.SetAuthToken:
            let temp: IAuthUserState = { ...authUser };
            temp.token = action.token;

            let jwtService = new JwtService(action.token, jwtKey);
            temp.decodeToken = jwtService.decode();
            temp.loggedUser = temp.decodeToken.name;

            return temp;
        case AuthUserActionType.RemoveAuthToken:
            return initialAuthState;

        default:
            return authUser
    }
}
