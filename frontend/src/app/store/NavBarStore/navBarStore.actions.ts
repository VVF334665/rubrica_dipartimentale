import { createAction, props } from "@ngrx/store";

export const changeItemActive = createAction(
    '[NavBar] Change Item Active',
    props<{ id: number }>()
)

export const changeItemActiveSA = createAction(
    '[NavBar] Change Item Active SuperAdmin'
)

export const confirmLogin = createAction(
    '[NavBar] Confirm Login',
    props<{ superAD: boolean }>()
)

export const confirmLogout = createAction(
    '[NavBar] Confirm Logout'
)

export const changeItemShow = createAction(
    '[NavBar] Change Item Show',
    props<{ id: number, status?: boolean }>()
)

export const fixReloadPage = createAction(
    '[NavBar] Fix Reload Page',
    props<{ pathRouter: string }>()
)

export const selectItem = createAction(
    '[NavBar] Select Item',
    props<{ id: number }>()
)

export const deselectAllItem = createAction(
    '[NavBar] Deselect All'
)