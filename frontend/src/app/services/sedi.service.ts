import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'  //oggetto che conterrà i dati asincroni ricevuti dalle chiamate
import { HttpClient } from '@angular/common/http'  //oggetto che gestisce la chiamata
import { ISede } from '../models/ISede';
import { environment } from '../../environments/environment';

@Injectable()
export class SedeServizio {
    private host: string = environment.apiGetChildSedeFromWauc;

    constructor(private chiamata: HttpClient) { }

    getUffici(id: string): Observable<Array<ISede>> {
        // console.log(id);

        if (id == '001') {
            return this.chiamata.get<Array<ISede>>(`${this.host}`);
        }

        return this.chiamata.get<Array<ISede>>(`${this.host}${id}`);
    }
}
