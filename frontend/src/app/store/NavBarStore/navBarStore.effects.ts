import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import * as NavBarActions from './navBarStore.actions';
import * as NavBarSelectors from './navBarStore.selectors';
import { exhaustMap, withLatestFrom } from "rxjs";

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
}