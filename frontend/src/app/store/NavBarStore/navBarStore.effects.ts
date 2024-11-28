import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as NavBarActions from './navBarStore.actions';
import * as NavBarSelectors from './navBarStore.selectors';
import { exhaustMap, withLatestFrom } from "rxjs";
import { concatLatestFrom } from '@ngrx/operators';
import * as AuthUserAction from "../actions/authuser.action";

@Injectable()
export class NavBarStoreEffects {
    constructor(private actions$: Actions, private store: Store) { }

    changeSelect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.changeItemActive),
            withLatestFrom(this.store.select(NavBarSelectors.getItemNavBar)),
            exhaustMap(([{ id }]) => {
                return [
                    NavBarActions.deselectAllItem(),
                    NavBarActions.selectItem({ id })
                ]
            })
        )
    );

    changeSelectSA$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.changeItemActiveSA),
            withLatestFrom(
                this.store.select(NavBarSelectors.getWithPathRouter("/login")),
                this.store.select(NavBarSelectors.getWithPathRouter("/logout")),
                this.store.select(NavBarSelectors.getWithPathRouter("/users"))
            ),
            exhaustMap(([_, login, out, user]) => {
                return [
                    NavBarActions.changeItemShow({ id: login ?? 2, status: false }),
                    NavBarActions.changeItemShow({ id: user ?? 4, status: true }),
                    NavBarActions.changeItemShow({ id: out ?? 3, status: true }),
                    NavBarActions.deselectAllItem(),
                    NavBarActions.selectItem({ id: user ?? 4 })
                ]
            })
        )
    );

    fixReloadPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.fixReloadPage),
            concatLatestFrom(({ pathRouter }) => this.store.select(NavBarSelectors.getWithPathRouter(pathRouter))),
            exhaustMap(([{ pathRouter }, val]) => {
                return [
                    pathRouter == "/users" ? NavBarActions.changeItemActiveSA() : NavBarActions.changeItemActive({ id: val ?? 0 })
                ]
            })
        )
    );

    confirmLogIn$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.confirmLogin),
            withLatestFrom(
                this.store.select(NavBarSelectors.getWithPathRouter("/login")),
                this.store.select(NavBarSelectors.getWithPathRouter("/logout")),
                this.store.select(NavBarSelectors.getWithPathRouter("/users"))
            ),
            exhaustMap(([{ superAD }, login, out, user]) => {
                return [
                    NavBarActions.changeItemShow({ id: login ?? 2, status: false }),
                    NavBarActions.changeItemShow({ id: user ?? 3, status: superAD }),
                    NavBarActions.changeItemShow({ id: out ?? 4, status: true }),
                ]
            })
        )
    );

    confirmLogOut$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.confirmLogout),
            withLatestFrom(
                this.store.select(NavBarSelectors.getWithPathRouter("/login")),
                this.store.select(NavBarSelectors.getWithPathRouter("/logout")),
                this.store.select(NavBarSelectors.getWithPathRouter("/users"))
            ),
            exhaustMap(([_, login, out, user]) => {
                return [
                    AuthUserAction.RemoveAuthToken(),
                    NavBarActions.changeItemShow({ id: login ?? 2, status: true }),
                    NavBarActions.changeItemShow({ id: user ?? 4, status: false }),
                    NavBarActions.changeItemShow({ id: out ?? 3, status: false })
                ]
            })
        )
    );
}
