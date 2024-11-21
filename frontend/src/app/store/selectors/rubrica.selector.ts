import { createSelector } from '@ngrx/store';

// const selectRubricaState = (state: any) => state.rubrica;
const selectRubricaState = (state: any) => state.rubrica;

export const selectHome = createSelector(
    selectRubricaState,
    // (state:Array<IOffice>) => state
    (state: any) => state
);


export const selectElencoUffici = createSelector(
    selectRubricaState,
    // (state:Array<IOffice>) => state
    // (state: any) => state.rubricaUfficiPeriferici
    (state: any) => state.elencoUffici
);

export const selectElencoUfficiSelezionatoPerModifica=createSelector(
    selectRubricaState,
    (state:any) => state.elencoUfficiSelezionatoPerModifica
);

export const selectUfficiPeriferici = createSelector(
    selectRubricaState,
    // (state:Array<IOffice>) => state
    // (state: any) => state.rubricaUfficiPeriferici
    (state: any) => state
);

export const selectUfficioSelezionato = createSelector(
    selectRubricaState,
    // (state:Array<IOffice>) => state
    (state: any) => state.ufficioSelezionato
);

export const selectElencoUfficiSelezionati = createSelector(
    selectRubricaState,
    (state: any) => state.elencoUfficiSelezionati
);

export const selectPersonale = createSelector(
    selectRubricaState,
    (state: any) => state.ufficioSelezionato.personale
)

export const selectHomeTabSelected = createSelector(
    selectRubricaState,
    (state: any) => state.homeTabSelected
);

export const selectIdSelectedOfficeComponent = createSelector(
    selectRubricaState,
    (state: any) => state.idSelectedOfficeComponent
);


export const selectPersonaDaModificare = createSelector(
    selectRubricaState,
    (state: any) => state.personaDaModificare
);
