import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IOffice } from '../models/IOffice';

@Injectable({
    providedIn: 'root'
})
export class RubricaService {
    private host: string = environment.apiGetHome;
    private hostElencoUffici: string = environment.apiElencoUffici;

    constructor(private http: HttpClient) { }

    getHome(queryString: string = "") {
        if (queryString == "") {
            queryString = "centrali";
        };

        return this.http.get<IOffice[]>(this.host + queryString);
    }

    getUfficiPeriferici() {
        let queryString: string = "periferia";
        return this.http.get<IOffice[]>(this.host + queryString);
    }

    getSearch(params: string) {
        if (params.length > 0) {
            let queryString = 'nomeTitolare=' + params + '&descrizioneUfficio=' + params + '&cognome=' + params + '&nome=' + params;

            console.log("ccxxxzzxxs: ",queryString);

            return this.http.get<IOffice[]>(this.host + queryString);
        }
        return [];
    }

    getElencoUffici(){
        let queryString: string = "";
        return this.http.get<IOffice[]>(this.hostElencoUffici + queryString);
    }
}
