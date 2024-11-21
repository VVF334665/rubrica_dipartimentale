import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../models/IUser";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private host: string = environment.apiProfile;

    constructor(private http: HttpClient) { }

    getProfili(queryString: string = "") {
        if (queryString == "") {
            queryString = "";
        };

        return this.http.get<IUser[]>(this.host + queryString);
    }

    delProfili(id: number) {
        return of({result: true});
        //return this.http.delete(this.host + '/' + id);
    }
}
