import { IProfili } from "../../models/IProfili";
import { IUser } from "../../models/IUser";

export interface IUsersState {
    usersList: Array<IUser>;
    profileList: Array<IProfili>,
    utenteDaModificare: IUser | null
}

export const initialUsersState: IUsersState = {
    usersList: [],
    profileList: [],
    utenteDaModificare: null,
};
