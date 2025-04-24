import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../interfaces/auth/login-dto';
import { Observable } from 'rxjs';
import { TokenResponseDto } from '../interfaces/auth/token-response-dto';
import { CreateUser } from '../interfaces/auth/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = "http://localhost:5204"
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  constructor(private client: HttpClient) { }

  login(loginDto: LoginDto): Observable<TokenResponseDto>{
    return this.client.post<TokenResponseDto>(`${this.baseUrl}/api/Auth/login`, loginDto, this.httpOptions)
  }

  createUser(registerModel: CreateUser){
    return this.client.post(`${this.baseUrl}/api/Auth/createUser`, registerModel, this.httpOptions)
  }

}
