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
        default:
            return rubricaState
    }
}
