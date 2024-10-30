import { IOffice } from "../../models/IOffice";
import { RubricaActionType } from "../actions/rubrica.action";
import { inizializeRubricaState, IRubricaState } from "../states/rubrica.state";

export function rubricaReducer(
    rubricaState: IRubricaState = inizializeRubricaState,
    action: any
) {
    let temp: IRubricaState;
    temp = { ...rubricaState };

    switch (action.type) {
        case RubricaActionType.GetHomeRubricaSuccess:
            temp['rubrica'] = action.rubrica;
            temp['ufficioSelezionato'] = action.rubrica[0] || [];
            temp['idSelectedOfficeComponent'] = action.rubrica[0].codiceUfficio || [];

            {
                let d: Array<IOffice | null> | null = [...(temp['elencoUfficiSelezionati'] ?? [])];
                d?.push(action.rubrica[0] ?? null);
                temp['elencoUfficiSelezionati'] = d;
            }

            // temp['personaDaModificare'] = null;

            return temp;
        case RubricaActionType.GetElencoUfficiSuccess:
            temp['elencoUffici'] = action.uffici ?? [];
            return temp;
        case RubricaActionType.GetUfficiPerifericiSuccess:
            // temp['rubricaUfficiPeriferici'] = action.rubricaUfficiPeriferici;
            temp['rubrica'] = action.rubrica;
            temp['ufficioSelezionato'] = action.rubrica[0] || [];
            temp['idSelectedOfficeComponent'] = action.rubrica[0].codiceUfficio || [];

            {
                let d: Array<IOffice | null> | null = [...(temp['elencoUfficiSelezionati'] ?? [])];
                d?.push(action.rubrica[0] ?? null);
                temp['elencoUfficiSelezionati'] = d;
            }

            return temp;
        case RubricaActionType.SetUfficioSelezionato:
            temp['ufficioSelezionato'] = action.ufficioSelezionato;
            return temp;
        case RubricaActionType.AddElencoUfficiSelezionati:
            {
                let d: Array<IOffice | null> | null = [...(temp['elencoUfficiSelezionati'] ?? [])];
                d?.push(action.ufficioSelezionato);
                temp['elencoUfficiSelezionati'] = d;
                return temp;
            }
        case RubricaActionType.EmptyElencoUfficiSelezionati:
            temp['elencoUfficiSelezionati'] = [];
            return temp;
        case RubricaActionType.DelElencoUfficiSelezionati:
            {
                let d: Array<IOffice | null> | null = [...(temp['elencoUfficiSelezionati'] ?? [])];
                d?.pop();
                temp['elencoUfficiSelezionati'] = d;
                return temp;
            }
        case RubricaActionType.SetHomeTabSelected:
            temp['homeTabSelected'] = action.homeTabSelected;
            return temp;
        case RubricaActionType.SetIdSelectedOfficeComponent:
            temp['idSelectedOfficeComponent'] = action.id;
            return temp;
        case RubricaActionType.SetContatto:
            let office: IOffice = { ...(temp.ufficioSelezionato ?? { codiceUfficio: '', nomeTitolare: '', nomeUfficio: '', contatti: [], children: [] }) }; // || { tipo: '', contatto: '' };
            //let arrayContatto = [...office.contatti ?? []];
            //arrayContatto.push(action.contatto);

            if (temp.ufficioSelezionato?.codiceUfficio == action.codiceUfficio) {
                //let office: IOffice = { ...(temp.ufficioSelezionato ?? { codiceUfficio: '', nomeTitolare: '', nomeUfficio: '', contatti: [], children: [] }) }; // || { tipo: '', contatto: '' };
                let arrayContatto = [...(office.contatti ?? [])]
                arrayContatto.push(action.contatto);
                return temp;
            }

            let a: Array<IOffice> = [];
            for (let o of (temp.ufficioSelezionato?.children ?? [])) {
                if (o.codiceUfficio == action.codiceUfficio) {

                    console.log('codice uguale');

                    let temp: IOffice = { ...o };

                    let arrayContatto = [...o.contatti ?? []];
                    arrayContatto.push(action.contatto);

                    temp.contatti = [...arrayContatto];
                    o = { ...temp };
                    console.log('office nel ciclo: ', o);

                    // break;
                }
                a.push(o);
            }

            //let office: IOffice = { ...(temp.ufficioSelezionato ?? { codiceUfficio: '', nomeTitolare: '', nomeUfficio: '', contatti: [], children: [] }) }; // || { tipo: '', contatto: '' };
            office.children = [...a];
            temp.ufficioSelezionato = { ...office };
            console.log('ufficioSelezionato: ', temp.ufficioSelezionato);

            //let zz: Office= new Office();;
            //zz.setOffices(temp.elencoUfficiSelezionati ?? [])
            //temp.elencoUfficiSelezionati
            return temp;
        case RubricaActionType.SetPersonaDaMoficiare:
            temp['personaDaModificare'] = action.persona;
            return temp;
        case RubricaActionType.DelContattoPersonale:
            console.log('Contatto Cancellato !!!!!!');
            return temp;
        case RubricaActionType.SaveContattoPersonale:
            console.log('Contatto Salvato !!!!!!');
            return temp;
        default:
            return rubricaState
    }
}
