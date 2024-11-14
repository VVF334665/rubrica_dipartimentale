import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { UsersService } from '../../services/users.service';
import { UsersActionType } from '../actions/users.action';

@Injectable()
export class UserEffects {

    loadUsersList$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActionType.GetUsers),
            exhaustMap(
                () => this.usersService.getUsers()
                    .pipe(
                        map((result: any) => {
                            return ({ type: UsersActionType.GetUsersSuccess, usersList: result })
                        }),
                        catchError(() => of({ type: UsersActionType.GetUsersError }))
                    )
            )
        )
    );

    /*loadDelUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActionType.DelUser),
            map((action) => action),
            mergeMap(
                (id: number) => this.usersService.delUser(id)
                    .pipe(
                        map(result => ({ type: UsersActionType.GetUsersSuccess, id: id })),
                        catchError(error => of({ type: UsersActionType.GetUsersError, error: error }))
                    )
            )
        )
    );*/

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private _appStore$: Store<AppState>
    ) { }
}
