import { createReducer, on } from "@ngrx/store";
import { ItemNavBar } from "../Interface_store/ItemNavBar";
import * as navBarActions from './navBarStore.actions';
import _ from 'lodash';

const init = [{
    pathRouter: '\\',
    label: 'Uff. Centrali',
    icon: 'account_balance',
    status: true,
    id: 0,
    show: true
}, {
    pathRouter: '\\',
    label: 'Sedi',
    icon: 'home_work',
    status: false,
    id: 1,
    show: true
}, {
    pathRouter: '\\',
    label: 'Login',
    icon: 'person',
    status: false,
    id: 2,
    show: true
}, {
    pathRouter: '\\',
    label: 'Logout',
    icon: 'personlogout',
    status: false,
    id: 3,
    show: false
}] as ItemNavBar[];

export const navBarStoreReducer = createReducer(
    init,
    on(navBarActions.deselectAllItem, (state) => {
        let newObj = _.cloneDeep(state);
        newObj.forEach(v => v.status = false);
        return newObj;
    }),
    on(navBarActions.selectItem, (state, { id }) => {
        let newObj = _.cloneDeep(state);
        let dataActive = newObj.find(x => x.id === id);
        dataActive!.status = true;
        return newObj;
    })
);