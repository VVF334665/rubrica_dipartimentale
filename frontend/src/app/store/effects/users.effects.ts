import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { UsersService } from '../../services/users.service';
import { UsersActionType } from '../actions/users.action';
import { ProfileService } from '../../services/profile.service';
import { IUser } from '../../models/IUser';

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

    loadProfileList$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActionType.GetProfile),
            exhaustMap(
                () => this.profileService.getProfili()
                    .pipe(
                        map((result: any) => {
                            return ({ type: UsersActionType.GetProfileSuccess, profileList: result })
                        }),
                        catchError(() => of({ type: UsersActionType.GetProfileError }))
                    )
            )
        )
    );

    loadDelUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActionType.DelUser),
            map((action) => action),
            mergeMap(
                (id: number) => this.usersService.delUser(id)
                    .pipe(
                        map(result => ({ type: UsersActionType.DelUserSuccess, id: id })),
                        catchError(error => of({ type: UsersActionType.DelUserError, error: error }))
                    )
            )
        )
    );

    loadSaveUser$ = createEffect(
        () => this.actions$.pipe(
            ofType(UsersActionType.SaveUser),
            map((action) => action),
            mergeMap(
                (user: IUser) => this.usersService.saveUser(user)
                    .pipe(
                        map(result => ({ type: UsersActionType.SaveUserSuccess, user: user })),
                        catchError(error => of({ type: UsersActionType.SaveUserError, error: error }))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private usersService: UsersService,
        private profileService: ProfileService,
        private _appStore$: Store<AppState>
    ) { }
}
