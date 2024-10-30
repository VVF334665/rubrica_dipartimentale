import { IOffice } from "../../models/IOffice";
import { IPersonale } from "../../models/IPersonale";

export interface IRubricaState {
    rubrica: Array<IOffice>;
    ufficioSelezionato: IOffice | null;
    elencoUfficiSelezionati: Array<IOffice | null> | null;
    homeTabSelected: string;
    idSelectedOfficeComponent: string;
    personaDaModificare: IPersonale | null;
    rubricaUfficiPeriferici: Array<IOffice>;
    elencoUffici: Array<IOffice>
}

export const inizializeRubricaState: IRubricaState = {
    rubrica: [],
    ufficioSelezionato: null,
    elencoUfficiSelezionati: [],
    homeTabSelected: 'ufficiDipendenti',
    idSelectedOfficeComponent: '',
    personaDaModificare: { id: 0, cognome: '', nome: '', codiceUfficio: '' },
    rubricaUfficiPeriferici: [],
    elencoUffici: []
}
