import { IContatto } from "./IContatto";

export interface IPersonale {
    id: number;
    cognome: string;
    nome: string;
    qualifica: string;
    codiceUfficio: string;
    contatti: Array<IContatto>;
}
