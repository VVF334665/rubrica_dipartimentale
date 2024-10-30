import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RubricaActionType } from "../actions/rubrica.action";
import { RubricaService } from "../../services/rubrica.service";
import { catchError, exhaustMap, map, of } from "rxjs";
import { AppState } from "../states/app.state";
import { Store } from "@ngrx/store";

@Injectable()
export class RubricaEffects {
    loadHome$ = createEffect(
        () => this.actions$.pipe(
            ofType(RubricaActionType.GetHomeRubrica),
            exhaustMap(
                () => this.rubricaService$.getHome()
                    .pipe(
                        map((result: any) => {
                            return ({ type: RubricaActionType.GetHomeRubricaSuccess, rubrica: result })
                        }),
                        catchError(() => of({ type: RubricaActionType.GetHomeRubricaError }))
                    )
            )
        )
    );

    loadUfficiPeriferici$ = createEffect(
        () => this.actions$.pipe(
            ofType(RubricaActionType.GetUfficiPeriferici),
            exhaustMap(
                () => this.rubricaService$.getUfficiPeriferici()
                    .pipe(
                        map((result: any) => {
                            // return ({ type: RubricaActionType.GetUfficiPerifericiSuccess, rubricaUfficiPeriferici: result })
                            return ({ type: RubricaActionType.GetUfficiPerifericiSuccess, rubrica: result })
                        }),
                        catchError(() => of({ type: RubricaActionType.GetUfficiPerifericiError }))
                    )
            )
        )
    );

    loadElencoUffici$ = createEffect(
        () => this.actions$.pipe(
            ofType(RubricaActionType.GetElencoUffici),
            exhaustMap(
                () => this.rubricaService$.getElencoUffici()
                    .pipe(
                        map((result: any) => {
                            return ({ type: RubricaActionType.GetElencoUfficiSuccess, uffici: result })
                        }),
                        catchError(() => of({ type: RubricaActionType.GetElencoUfficiError }))
                    )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private rubricaService$: RubricaService,
        private appStore$: Store<AppState>
    ) { }
}
