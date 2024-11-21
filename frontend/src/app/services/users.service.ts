import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { IUser } from "../models/IUser";
import { of } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private host: string = environment.apiUsers;

    constructor(private http: HttpClient) { }

    getUsers(queryString: string = "") {
        if (queryString == "") {
            queryString = "";
        };

        return this.http.get<IUser[]>(this.host + queryString);
    }

    saveUser(user: IUser) {
        return of({ result: true });
        //return this.http.delete(this.host + '/' + id);
    }

    delUser(id: number) {
        return of({ result: true });
        //return this.http.delete(this.host + '/' + id);
    }
}
