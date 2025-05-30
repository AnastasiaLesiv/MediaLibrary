import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../../interfaces/auth/login.model';
import { Observable } from 'rxjs';
import { TokenResponse } from '../../interfaces/auth/token-response.model';
import { CreateUser } from '../../interfaces/auth/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  login(loginDto: Login): Observable<TokenResponse>{
    return this.client.post<TokenResponse>(`${this.baseUrl}/api/Auth/login`, loginDto, this.httpOptions)
  }

  createUser(registerModel: CreateUser){
    return this.client.post(`${this.baseUrl}/api/Auth/createUser`, registerModel, this.httpOptions)
  }

}
