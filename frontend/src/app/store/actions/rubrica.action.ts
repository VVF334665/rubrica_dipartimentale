import { createAction, props } from "@ngrx/store";
import { IOffice } from "../../models/IOffice";
import { IContatto } from "../../models/IContatto";
import { IPersonale } from "../../models/IPersonale";

export enum RubricaActionType {
    GetHomeRubrica = '[Get Home Rubrica] Get Home Rubrica',
    GetHomeRubricaSuccess = '[Get Home Rubrica] Get Home Rubrica Success',
    GetHomeRubricaError = '[Get Home Rubrica] Get Home Rubrica Error',

    GetUfficiPeriferici = '[Get Uffici Periferici] Get Uffici Periferici',
    GetUfficiPerifericiSuccess = '[Get Uffici Periferici] Get Uffici Periferici Success',
    GetUfficiPerifericiError = '[Get Uffici Periferici] Get Uffici Periferici Error',

    DelUfficio = '[Del Ufficio] Del Ufficio',
    DelUfficioSuccess = '[Del Ufficio] Del Ufficio Success',
    DelUfficioError = '[Del Ufficio] Del Ufficio Error',
    SaveUfficio = '[Save Ufficio] Save Ufficio',
    SaveUfficioSuccess = '[Save Ufficio] Save Ufficio Success',
    SaveUfficioError = '[Save Ufficio] Save Ufficio Error',

    GetElencoUffici = '[Get Elenco Uffici] Get Uffici',
    GetElencoUfficiSuccess = '[Get Elenco Uffici] Get Uffici Success',
    GetElencoUfficiError = '[Get Elenco Uffici] Get Uffici Error',

    GetElencoUfficiSelezionatoPerModifica = '[Get Elenco Uffici Selezionato] Get Uffici Selezionato',
    GetElencoUfficiSelezionatoPerModificaSuccess = '[Get Elenco Uffici Selezionato] Get Uffici Success Selezionato',
    GetElencoUfficiSelezionatoPerModificaError = '[Get Elenco Uffici Selezionato] Get Uffici Error Selezionato',
    SetElencoUfficiSelezionatoPerModifica = '[SetElencoUfficiSelezionatoPerModifica] SetElencoUfficiSelezionatoPerModifica',
    SetElencoUfficiSelezionatoPerModificaSuccess = '[SetElencoUfficiSelezionatoPerModifica Success] SetElencoUfficiSelezionatoPerModifica Success',
    SetElencoUfficiSelezionatoPerModificaError = '[SetElencoUfficiSelezionatoPerModifica Error] SetElencoUfficiSelezionatoPerModifica Error',

    GetPersonale = '[Get Personale] Get Personale',
    GetPersonaleSuccess = '[Get Personale] Get Personale',
    GetPersonaleError = '[Get Personale] Get Personale Error',

    DelPersonale = '[Del Personale] Del Personale',
    DelPersonaleSuccess = '[Del Personale] Del Personale',
    DelPersonaleError = '[Del Personale] Del Personale Error',

    SavePersonale = '[Save Personale] Del Personale',
    SavePersonaleSuccess = '[Save Personale] Del Personale',
    SavePersonaleError = '[Save Personale] Del Personale Error',

    GetUfficioSelezionato = '[Get Ufficio Selezionato] Get Ufficio Selezionato',
    GetUfficioSelezionatoSuccess = '[Get Ufficio Selezionato] Get Ufficio Selezionato Success',
    GetUfficioSelezionatoError = '[Get Ufficio Selezionato] Get Ufficio Selezionato Error',
    SetUfficioSelezionato = '[Set Ufficio Selezionato] Set Ufficio Selezionato',
    SetUfficioSelezionatoSuccess = '[Set Ufficio Selezionato] Set Ufficio Selezionato Success',
    SetUfficioSelezionatoError = '[Set Ufficio Selezionato] Set Ufficio Selezionato Error',

    GetElencoUfficiSelezionati = '[Get Elenco Ufficio Selezionato] Get Elenco Ufficio Selezionato',
    GetElencoUfficiSelezionatiSuccess = '[Get Elenco Ufficio Selezionato] Get Elenco Ufficio Selezionato Success',
    GetElencoUfficiSelezionatiError = '[Get Elenco Ufficio Selezionato] Get Elenco Ufficio Selezionato Error',
    AddElencoUfficiSelezionati = '[Add Elenco Ufficio Selezionato] Add Elenco Ufficio Selezionato',
    AddElencoUfficiSelezionatiSuccess = '[Add Elenco Ufficio Selezionato] Add Ufficio Selezionato Success',
    AddElencoUfficiSelezionatiError = '[Add Elenco Ufficio Selezionato] Add Elenco Ufficio Selezionato Error',
    DelElencoUfficiSelezionati = '[Del Elenco Ufficio Selezionato] Del Elenco Ufficio Selezionato',
    DelElencoUfficiSelezionatiSuccess = '[Del Elenco Ufficio Selezionato] Del Ufficio Selezionato Success',
    DelElencoUfficiSelezionatiError = '[Del Elenco Ufficio Selezionato] Del Elenco Ufficio Selezionato Error',
    EmptyElencoUfficiSelezionati = '[Empty Elenco Ufficio Selezionato] Empty Elenco Ufficio Selezionato',
    EmptyElencoUfficiSelezionatiSuccess = '[Empty Elenco Ufficio Selezionato] Empty Ufficio Selezionato Success',
    EmptyElencoUfficiSelezionatiError = '[Empty Elenco Ufficio Selezionato] Empty Elenco Ufficio Selezionato Error',

    GetHomeTabSelected = '[Get HomeTabSelected] Get HomeTabSelected',
    GetHomeTabSelectedSuccess = '[Get HomeTabSelected] Get HomeTabSelected Success',
    GetHomeTabSelectedError = '[Get HomeTabSelected] Get HomeTabSelected Error',
    SetHomeTabSelected = '[Set HomeTabSelected] Set HomeTabSelected',
    SetHomeTabSelectedSuccess = '[Set HomeTabSelected] Set HomeTabSelected Success',
    SetHomeTabSelectedError = '[Set HomeTabSelected] Set HomeTabSelected Error',

    GetIdSelectedOfficeComponent = '[Get IdSelectedOfficeComponent] Get IdSelectedOfficeComponent',
    GetIdSelectedOfficeComponentSuccess = '[Get IdSelectedOfficeComponent Success] Get IdSelectedOfficeComponent Success',
    GetIdSelectedOfficeComponentError = '[Get IdSelectedOfficeComponent Error] Get IdSelectedOfficeComponent Error',
    SetIdSelectedOfficeComponent = '[Set IdSelectedOfficeComponent] Set IdSelectedOfficeComponent',
    SetIdSelectedOfficeComponentSuccess = '[Set IdSelectedOfficeComponent Success] Set IdSelectedOfficeComponent Success',
    SetIdSelectedOfficeComponentError = '[Set IdSelectedOfficeComponent Errore] Set IdSelectedOfficeComponent Error',

    SaveContatto = '[Save Contatto] Save Contatto',
    SaveContattoSuccess = '[Save Contatto Success] Save Contatto Success',
    SaveContattoError = '[Save Contatto Errore] Save Contatto Error',

    DelContatto = '[Del Contatto] Del Contatto',
    DelContattoSuccess = '[Del Contatto Success] Del Contatto Success',
    DelContattoError = '[Del Contatto Errore] Del Contatto Error',

    SaveContattoPersonale = '[Save Contatto Personale] Save Contatto Personale',
    SaveContattoPersonaleSuccess = '[Save Contatto Success] Save Contatto Personale Success',
    SaveContattoPersonaleError = '[Save Contatto Errore] Save Contatto Personale Error',
    DelContattoPersonale = '[Del Contatto Personale] Del Contatto Personale',
    DelContattoPersonaleSuccess = '[Del Contatto Success] Del Contatto Personale Success',
    DelContattoPersonaleError = '[Del Contatto Errore] Del Contatto Personale Error',

    SetPersonaDaMoficiare = '[Set PersonaDaMoficiare] Set PersonaDaMoficiare',
    SetPersonaDaMoficiareSuccess = '[Set PersonaDaMoficiare Success] Set PersonaDaMoficiare Success',
    SetPersonaDaMoficiareError = '[Set PersonaDaMoficiare Errore] Set PersonaDaMoficiare Error',
    GetPersonaDaMoficiare = '[Get PersonaDaMoficiare] Get PersonaDaMoficiare',
    GetPersonaDaMoficiareSuccess = '[Get PersonaDaMoficiare Success] Get PersonaDaMoficiare Success',
    GetPersonaDaMoficiareError = '[Get PersonaDaMoficiare Errore] Get PersonaDaMoficiare Error',
}

export const GetHomeRubrica = createAction(
    RubricaActionType.GetHomeRubrica,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetHomeRubricaSuccess = createAction(
    RubricaActionType.GetHomeRubricaSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetHomeRubricaError = createAction(
    RubricaActionType.GetHomeRubricaError
);

export const GetUfficiPeriferici = createAction(
    RubricaActionType.GetUfficiPeriferici,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetUfficiPerifericiSuccess = createAction(
    RubricaActionType.GetUfficiPerifericiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetUfficiPerifericiError = createAction(
    RubricaActionType.GetUfficiPerifericiError
);

export const DelUfficio = createAction(
    RubricaActionType.DelUfficio,
    props<{ ufficio: IOffice | null }>()
);

export const GetUfficioSuccess = createAction(
    RubricaActionType.DelUfficioSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const DelUfficioError = createAction(
    RubricaActionType.DelUfficioError
);

export const GetElencoUffici = createAction(
    RubricaActionType.GetElencoUffici,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiSuccess = createAction(
    RubricaActionType.GetElencoUfficiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiError = createAction(
    RubricaActionType.GetElencoUfficiError
);

export const GetElencoUfficiSelezionatoPerModifica = createAction(
    RubricaActionType.GetElencoUfficiSelezionatoPerModifica,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiSelezionatoPerModificaSuccess = createAction(
    RubricaActionType.GetElencoUfficiSelezionatoPerModificaSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiSelezionatoPerModificaError = createAction(
    RubricaActionType.GetElencoUfficiSelezionatoPerModificaError
);

export const SetElencoUfficiSelezionatoPerModifica = createAction(
    RubricaActionType.SetElencoUfficiSelezionatoPerModifica,
    props<{ ufficio: IOffice|null }>()
);

export const SetElencoUfficiSelezionatoPerModificaSuccess = createAction(
    RubricaActionType.SetElencoUfficiSelezionatoPerModificaSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SetElencoUfficiSelezionatoPerModificaError = createAction(
    RubricaActionType.SetElencoUfficiSelezionatoPerModificaError
);

export const GetPersonale = createAction(
    RubricaActionType.GetPersonale,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetPersonaleSuccess = createAction(
    RubricaActionType.GetPersonaleSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetPersonaleError = createAction(
    RubricaActionType.GetPersonaleError
);

export const DelPersonale = createAction(
    RubricaActionType.DelPersonale,
    props<{ persona: IPersonale | null }>()
);

export const DelPersonaleSuccess = createAction(
    RubricaActionType.DelPersonaleSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const DelPersonaleError = createAction(
    RubricaActionType.DelPersonaleError
);

export const SavePersonale = createAction(
    RubricaActionType.SavePersonale,
    props<{ persona: IPersonale | null }>()
);

export const SavePersonaleSuccess = createAction(
    RubricaActionType.SavePersonaleSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SavePersonaleError = createAction(
    RubricaActionType.SavePersonaleError
);

export const GetUfficioSelezionato = createAction(
    RubricaActionType.GetUfficioSelezionato,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetUfficioSelezionatoSuccess = createAction(
    RubricaActionType.GetUfficioSelezionatoSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetUfficioSelezionatoError = createAction(
    RubricaActionType.GetUfficioSelezionatoError
);

export const SetUfficioSelezionato = createAction(
    RubricaActionType.SetUfficioSelezionato,
    props<{ ufficioSelezionato: IOffice | null }>()
);

export const SetUfficioSelezionatoSuccess = createAction(
    RubricaActionType.SetUfficioSelezionatoSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SetUfficioSelezionatoError = createAction(
    RubricaActionType.SetUfficioSelezionatoError
);

export const GetHomeTabSelected = createAction(
    RubricaActionType.GetHomeTabSelected,
);

export const GetHomeTabSelectedSuccess = createAction(
    RubricaActionType.GetHomeTabSelectedSuccess,
);

export const GetHomeTabSelectedError = createAction(
    RubricaActionType.GetHomeTabSelectedError
);

export const SetHomeTabSelected = createAction(
    RubricaActionType.SetHomeTabSelected,
    props<{ homeTabSelected: string }>()
);

export const SetHomeTabSelectedSuccess = createAction(
    RubricaActionType.SetHomeTabSelectedSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SetHomeTabSelectedError = createAction(
    RubricaActionType.SetHomeTabSelectedError
);

export const GetElencoUfficiSelezionati = createAction(
    RubricaActionType.GetElencoUfficiSelezionati,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiSelezionatiSuccess = createAction(
    RubricaActionType.GetElencoUfficiSelezionatiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetElencoUfficiSelezionatiError = createAction(
    RubricaActionType.GetElencoUfficiSelezionatiError
);

export const AddElencoUfficiSelezionati = createAction(
    RubricaActionType.AddElencoUfficiSelezionati,
    props<{ ufficioSelezionato: IOffice | null }>()
);

export const AddElencoUfficiSelezionatiSuccess = createAction(
    RubricaActionType.AddElencoUfficiSelezionatiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const AddElencoUfficiSelezionatiError = createAction(
    RubricaActionType.AddElencoUfficiSelezionatiError
);

export const DelElencoUfficiSelezionati = createAction(
    RubricaActionType.DelElencoUfficiSelezionati,
    //props<{ ufficioSelezionato: IOffice | null }>()
);

export const DelElencoUfficiSelezionatiSuccess = createAction(
    RubricaActionType.DelElencoUfficiSelezionatiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const EmptyElencoUfficiSelezionatiError = createAction(
    RubricaActionType.EmptyElencoUfficiSelezionatiError
);

export const EmptyElencoUfficiSelezionati = createAction(
    RubricaActionType.EmptyElencoUfficiSelezionati,
    //props<{ ufficioSelezionato: IOffice | null }>()
);

export const EmptyElencoUfficiSelezionatiSuccess = createAction(
    RubricaActionType.EmptyElencoUfficiSelezionatiSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const DelElencoUfficiSelezionatiError = createAction(
    RubricaActionType.DelElencoUfficiSelezionatiError
);

export const GetIdSelectedOfficeComponent = createAction(
    RubricaActionType.GetIdSelectedOfficeComponent,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetIdSelectedOfficeComponentSuccess = createAction(
    RubricaActionType.GetIdSelectedOfficeComponentSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetIdSelectedOfficeComponentError = createAction(
    RubricaActionType.GetIdSelectedOfficeComponentError
);

export const SetIdSelectedOfficeComponent = createAction(
    RubricaActionType.SetIdSelectedOfficeComponent,
    props<{ id: string }>()
);

export const SetIdSelectedOfficeComponentSuccess = createAction(
    RubricaActionType.SetIdSelectedOfficeComponentSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SetIdSelectedOfficeComponentError = createAction(
    RubricaActionType.SetIdSelectedOfficeComponentError
);

export const SaveContatto = createAction(
    RubricaActionType.SaveContatto,
    props<{ contatto: IContatto, codiceUfficio: string }>()
);

export const SaveContattoSuccess = createAction(
    RubricaActionType.SaveContattoSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SaveContattoError = createAction(
    RubricaActionType.SaveContattoError
);

export const SetPersonaDaMoficiare = createAction(
    RubricaActionType.SetPersonaDaMoficiare,
    props<{ persona: IPersonale | undefined }>()
    // props<{ persona: IPersonale | undefined, codiceUfficio: string }>()
);

export const SetPersonaDaMoficiareSuccess = createAction(
    RubricaActionType.SetPersonaDaMoficiareSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const SetPersonaDaMoficiareError = createAction(
    RubricaActionType.SetPersonaDaMoficiareError
);

export const GetPersonaDaMoficiare = createAction(
    RubricaActionType.GetPersonaDaMoficiare,
    props<{ persona: IPersonale | undefined }>()
    // props<{ persona: IPersonale | undefined, codiceUfficio: string }>()
);

export const GetPersonaDaMoficiareSuccess = createAction(
    RubricaActionType.GetPersonaDaMoficiareSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const GetPersonaDaMoficiareError = createAction(
    RubricaActionType.GetPersonaDaMoficiareError
);

export const DelContattoPersonale = createAction(
    RubricaActionType.DelContattoPersonale,
    props<{ contatto: IContatto | undefined }>()
    // props<{ persona: IPersonale | undefined, codiceUfficio: string }>()
);

export const DelContattoPersonaleSuccess = createAction(
    RubricaActionType.DelContattoPersonaleSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const DelContattoPersonaleError = createAction(
    RubricaActionType.DelContattoPersonaleError
);

export const DelContatto = createAction(
    RubricaActionType.DelContatto,
    props<{ contatto: IContatto | undefined }>()
    // props<{ persona: IPersonale | undefined, codiceUfficio: string }>()
);

export const DelContattoSuccess = createAction(
    RubricaActionType.DelContattoSuccess,
    //props<{rubrica: Array<IOffice>}>()
);

export const DelContattoError = createAction(
    RubricaActionType.DelContattoError
);
