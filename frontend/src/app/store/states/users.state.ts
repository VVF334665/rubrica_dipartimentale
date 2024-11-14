import { IUser } from "../../models/IUser";

export interface IUsersState {
    usersList: Array<IUser>;
    utenteDaModificare: IUser | null
}

export const initialUsersState: IUsersState = {
    usersList: [],
    utenteDaModificare: null,
};
