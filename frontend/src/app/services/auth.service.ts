import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private host: string = environment.apiCreateToken;

  constructor(private readonly http: HttpClient) { }

  getAuthToken() {
    let queryString: string = "";
    return this.http.get<any[]>(this.host + queryString);
  }
}
