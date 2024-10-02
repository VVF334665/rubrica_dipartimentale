import { IOffice } from "../../models/IOffice";

export interface IRubricaState {
    rubrica: Array<IOffice>;
    ufficioSelezionato: IOffice | null;
    elencoUfficiSelezionati: Array<IOffice | null> | null;
    homeTabSelected: string;
    idSelectedOfficeComponent: string;
}

export const inizializeRubricaState: IRubricaState = {
    rubrica: [],
    ufficioSelezionato: null,
    elencoUfficiSelezionati: [],
    homeTabSelected: 'ufficiDipendenti',
    idSelectedOfficeComponent: '',
}
