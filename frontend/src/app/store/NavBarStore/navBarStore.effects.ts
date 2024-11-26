import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as NavBarActions from './navBarStore.actions';
import * as NavBarSelectors from './navBarStore.selectors';
import { exhaustMap, withLatestFrom } from "rxjs";
import { concatLatestFrom } from '@ngrx/operators';

@Injectable()
export class NavBarStoreEffects {
    constructor(private actions$: Actions, private store: Store) { }

    changeSelect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.changeItemActive),
            withLatestFrom(this.store.select(NavBarSelectors.getItemNavBar)),
            exhaustMap(([{ id }]) => {
                // console.log(id);
                return [
                    NavBarActions.deselectAllItem(),
                    NavBarActions.selectItem({ id })
                ]
            })
        )
    );

    fixReloadPage$ = createEffect(() =>
        this.actions$.pipe(
            ofType(NavBarActions.fixReloadPage),
            concatLatestFrom(({ pathRouter }) => this.store.select(NavBarSelectors.getWithPathRouter(pathRouter))),
            exhaustMap(([, val]) => {
                return [
                    NavBarActions.changeItemActive({ id: val ?? 0 })
                ]
            })
        )
    );
}
